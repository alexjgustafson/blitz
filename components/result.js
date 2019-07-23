import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Result( props ) {
  const {losingPlayer} = props;
  return (
    <View style={styles.container}>
      <Text>{losingPlayer ? 'White' : 'Black'} lost on time.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
