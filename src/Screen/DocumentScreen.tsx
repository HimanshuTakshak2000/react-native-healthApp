import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DocumentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Document Screen</Text>
    </View>
  );
};

export default DocumentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 20,
  },
});
