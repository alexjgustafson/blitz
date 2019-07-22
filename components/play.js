import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Play( props ) {
  const {activePlayer, boardPosition, blackTime, whiteTime} = props.settings;
  const styles = StyleSheet.create({
    black: {
      flex: 1,
      backgroundColor: '#000',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    blackText: {
      color: '#fff',
      fontSize: activePlayer ? 20 : 48,
      transform: [{ rotate: boardPosition ? '-90deg' : '90deg' }],    
    },
    white: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    whiteText: {
      fontSize: activePlayer ? 48 : 20,
      transform: [{ rotate: boardPosition ? '-90deg' : '90deg' }],    
    },
  });

  return (
    <>
    <View style={styles.white}>
      <Text style={styles.whiteText}>{ activePlayer ? '♔' : ''}{whiteTime}</Text>
    </View>
    <View style={styles.black}>
      <Text>♔</Text>
      <Text style={styles.blackText}>{ activePlayer ? '' : '♔'}{blackTime}</Text>
    </View>
    </>
  );
}


