import React from 'react';
import {Text, StyleSheet} from 'react-native';

type IPDetailsProps = {
  ip: string;
  isp: string;
  address: string;
  timezone: string;
};

const IPDetail: React.FC<IPDetailsProps> = ({ip, isp, address, timezone}) => {
  return (
    <>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>IP:</Text> {ip}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>ISP:</Text> {isp}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>Timezone:</Text> {`UTC ${timezone}`}
      </Text>
      <Text style={styles.label}>
        <Text style={styles.boldLabel}>Address:</Text> {address}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  boldLabel: {
    fontWeight: 'bold',
  },
});

export default IPDetail;
