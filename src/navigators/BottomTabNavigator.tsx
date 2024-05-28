import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Dashboard from '../screens/Dashboard';
import MarketData from '../screens/MarketData';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: '#03396C',
          borderTopWidth: 2,
          borderTopColor: '#03396C',
        },
        tabBarActiveTintColor: '#067EEF',
        tabBarInactiveTintColor: '#ffffff',
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({color}) => (
            <Text style={[styles.tabBarLabel, {color}]}>Dashboard</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialIcons name="dashboard" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="MarketData"
        component={MarketData}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({color}) => (
            <Text style={[styles.tabBarLabel, {color}]}>Market Data</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="dots-triangle"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarLabel: ({color}) => (
            <Text style={[styles.tabBarLabel, {color}]}>Profile</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color}) => (
            <FontAwesome name="user-circle" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default BottomTabNavigator;
