import React from 'react';
import { TouchableHighlight, StyleSheet, Text, View } from 'react-native';

export default function Play( props ) {
  const {activePlayer, blackTime, boardPosition, onTap, whiteTime} = props.settings;
  const styles = StyleSheet.create({
    black: {
      flex: 1,
      backgroundColor: '#333',
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
    <TouchableHighlight style={styles.white} onPress={ () => onTap(1) } underlayColor='#ccc'>
      <Text style={styles.whiteText}>{ activePlayer ? '♔' : ''}{whiteTime}</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.black} onPress={ () => onTap(0) } underlayColor='#555'>
      <Text style={styles.blackText}>{ !activePlayer ? '♔' : ''}{blackTime}</Text>
    </TouchableHighlight>
    </>
  );
}


