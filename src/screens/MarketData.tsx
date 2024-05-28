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

const MarketData: React.FC = () => {
  const [tradeData, setTradeData] = useState([]);
  const chartData = tradeData.map(data => data.p.toFixed(2));

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:443/ws/btcusdt');

    const subscribe = {
      method: 'SUBSCRIBE',
      params: ['btcusdt@aggTrade'],
      id: 1,
    };

    ws.onopen = function open() {
      console.log('connected');
      ws.send(JSON.stringify(subscribe));
    };

    ws.onclose = function close() {
      console.log('disconnected');
    };

    ws.onmessage = function incoming(data) {
      let incomingData = JSON.parse(data.data);
      if (incomingData) {
        let newTradeData = {
          p: Number(incomingData?.p),
          q: Number(incomingData?.q),
          s: incomingData?.s,
          t: incomingData?.T,
        };
        console.log(newTradeData);
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
      {/* <Text style={styles.cell}>{item.p}</Text>
      <Text style={styles.cell}>{item.q}</Text> */}
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

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* <LineChart
          data={{
            // labels: timestamps,
            datasets: [
              {
                data:
                  chartData.length > 50
                    ? chartData.slice(chartData.length - 50, chartData.length)
                    : chartData,
              },
            ],
          }}
          width={Dimensions.get('window').width - 10} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#03396C',
            backgroundGradientFrom: '#03396C',
            backgroundGradientTo: '#03396C',
            decimalPlaces: 2, // optional, defaults to 2dp
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
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        /> */}
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
