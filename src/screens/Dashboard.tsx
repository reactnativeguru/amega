import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {getIPDetail} from '../utils/RequestHandler';
import {DashboardProps} from '../types/Navigation';
import {IPAPIResponse} from '../types/APIResponse';
import IPDetail from '../components/IPDetail';

const {width} = Dimensions.get('window');

const images = [
  require('../assets/image1.png'),
  require('../assets/image2.jpeg'),
  require('../assets/image3.jpg'),
];

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const [ip, setIp] = useState<string>('');
  const [isp, setIsp] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    fetchIpDetails();
  }, []);

  const fetchIpDetails = async () => {
    try {
      const response = (await getIPDetail()) as IPAPIResponse;
      setIp(response.ip);
      setIsp(response.connection.isp);
      setAddress(`${response.city}, ${response.country}`);
      setTimezone(response.timezone.utc);
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = (image: any) => {
    navigation.navigate('Profile', {ip, isp, address, timezone, image});
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter IP"
        value={ip}
        onChangeText={setIp}
        style={styles.input}
      />
      <IPDetail ip={ip} isp={isp} timezone={timezone} address={address} />
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index.toString()}
            activeOpacity={0.9}
            onPress={() => selectImage(item)}>
            <Image source={item} style={styles.image} resizeMode="contain" />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#03396C',
    borderRadius: 4,
    backgroundColor: '#F4F4F4',
    color: '#000',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: width - 50,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Dashboard;
