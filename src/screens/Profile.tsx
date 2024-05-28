import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {getIPDetail} from '../utils/RequestHandler';
import {IPAPIResponse} from '../types/APIResponse';

type RootStackParamList = {
  Profile: {
    ip: string;
    isp: string;
    address: string;
    timezone: string;
    image: any;
  };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

type IPDetailsProps = {
  ip: string;
  isp: string;
  address: string;
  timezone: string;
};

const Profile: React.FC<Props> = ({route}) => {
  const {ip, isp, address, timezone, image} = route?.params || {};
  const [ipDetails, setIpDetails] = useState<IPDetailsProps>({
    ip: '',
    isp: '',
    address: '',
    timezone: '',
  });

  useEffect(() => {
    fetchIpDetails();
  }, []);

  const fetchIpDetails = async () => {
    try {
      const response = (await getIPDetail()) as IPAPIResponse;
      setIpDetails({
        ip: response.ip,
        isp: response.connection.isp,
        address: `${response.city}, ${response.country}`,
        timezone: response.timezone.utc,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>IP:</Text> {ip ? ip : ipDetails.ip}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>ISP:</Text> {isp ? isp : ipDetails.isp}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>Timezone:</Text>{' '}
        {`UTC ${timezone ? timezone : ipDetails.timezone}`}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>Address:</Text>{' '}
        {address ? address : ipDetails.address}
      </Text>
      {image && <Image source={image} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default Profile;
