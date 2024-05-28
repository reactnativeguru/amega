import React from 'react';
import {View, Text} from 'react-native';

const LineChart = ({width, height, style}) => (
  <View style={[{width, height, ...style}]}>
    <Text>LineChart Mock</Text>
  </View>
);

export {LineChart};
