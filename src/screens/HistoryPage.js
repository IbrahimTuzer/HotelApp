import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HistoryPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HistoryPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
  },
});

export default HistoryPage;
