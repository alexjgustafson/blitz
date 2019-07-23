import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';

export default function Result( props ) {
  const {losingPlayer, backToStart} = props;
  return (
    <View style={styles.container}>
      <Text>{losingPlayer ? 'White' : 'Black'} lost on time.</Text>
      <Button
        title='Back To Start'
        onPress={() => {
          backToStart();
        }}>
      </Button>
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
