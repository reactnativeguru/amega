import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {getIPDetail} from '../utils/RequestHandler';
import {IPAPIResponse} from '../types/APIResponse';
import IPDetail from '../components/IPDetail';

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
      <IPDetail
        ip={ip ? ip : ipDetails.ip}
        isp={isp ? isp : ipDetails.isp}
        timezone={timezone ? timezone : ipDetails.timezone}
        address={address ? address : ipDetails.address}
      />
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
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default Profile;
