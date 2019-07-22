import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Start( props ) {
  const {boardPosition, onBoardPositionChange} = props;

  return (
    <View style={styles.container}>
      <Text>Hello, start!</Text>
      <Button onPress={() => onBoardPositionChange()} title="Toggle Board Position"></Button>
      <Text>Board position is {boardPosition ? `Right` : `Left`}</Text>
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
