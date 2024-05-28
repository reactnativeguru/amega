import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  Dashboard: undefined;
  Profile: {
    ip: string;
    isp: string;
    address: string;
    timezone: string;
    image: any;
  };
};

export type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export type DashboardProps = {
  navigation: DashboardNavigationProp;
  route: DashboardRouteProp;
};
