import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

export default function Start( props ) {
  const {boardPosition, onBoardPositionChange, onPlay, timeControl} = props.settings;

  return (
    <>
    <View style={styles.container}>
      <Text>Time control is: {moment.duration(timeControl, 'seconds').asMinutes()} minutes.</Text>
    </View>
    <View style={styles.container}>
      <Button onPress={() => onBoardPositionChange()} title="Toggle Board Position"></Button>
      <Text>Board position is {boardPosition ? `Right` : `Left`}</Text>
      <Button onPress={() => onPlay()} title="Play"></Button>
    </View>
    </>
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
