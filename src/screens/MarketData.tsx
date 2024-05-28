import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import WebSocket from 'isomorphic-ws';
import {TradeData} from '../types/MarketData';

const subscribe = {
  method: 'SUBSCRIBE',
  params: ['btcusdt@aggTrade'],
  id: 1,
};

const MarketData: React.FC = () => {
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  const chartData = tradeData.map(item => item.p.toFixed(2));

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:443/ws/btcusdt');

    ws.onopen = () => {
      console.log('connected');
      ws.send(JSON.stringify(subscribe));
    };

    ws.onclose = () => {
      console.log('disconnected');
    };

    ws.onmessage = (data: any) => {
      console.log(data);
      let incomingData = JSON.parse(data.data);
      if (incomingData) {
        let newTradeData: TradeData = {
          p: Number(incomingData?.p),
          q: Number(incomingData?.q),
          s: incomingData?.s,
          t: incomingData?.T,
        };
        if (
          newTradeData.p &&
          newTradeData.q &&
          newTradeData.s &&
          newTradeData.t
        ) {
          setTradeData(prevTradeData => [...prevTradeData, newTradeData]);
        }
      }
    };
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.s}</Text>
      <Text style={styles.cell}>{item.p.toFixed(2)}</Text>
      <Text style={styles.cell}>{item.q.toFixed(2)}</Text>
      <Text style={styles.cell}>{new Date(item.t).toLocaleTimeString()}</Text>
    </View>
  );

  if (chartData.length <= 5) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03396C" />
      </View>
    );
  }
  const data = {
    labels:
      tradeData.length > 5
        ? tradeData
            .slice(tradeData.length - 5, tradeData.length)
            .map(item => new Date(item.t).toLocaleTimeString())
        : tradeData.map(item => new Date(item.t).toLocaleTimeString()),
    datasets: [
      {
        data:
          tradeData.length > 5
            ? tradeData
                .slice(tradeData.length - 5, tradeData.length)
                .map(item => item.p)
            : tradeData.map(item => item.p),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={Dimensions.get('window').width - 10}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#03396C',
            backgroundGradientFrom: '#03396C',
            backgroundGradientTo: '#03396C',
            decimalPlaces: 2,
            color: () => '#067EEF',
            labelColor: () => '#067EEF',
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '1',
              stroke: '#067EEF',
            },
          }}
          bezier
          style={styles.lineChart}
        />
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Trade</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Quantity</Text>
        <Text style={styles.headerCell}>Time</Text>
      </View>
      <FlatList
        data={tradeData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginTop: 20,
  },
  headerCell: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
});

export default MarketData;
