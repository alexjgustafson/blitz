import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';

export default function Result( props ) {
  const {backToStart, losingPlayer} = props.settings;

  const styles = StyleSheet.create({
    black: {
      alignItems: 'center',
      backgroundColor: '#333',
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
    },
    lossText: {
      color: losingPlayer ? '#333' : '#fff',
      transform: [{ rotate: losingPlayer ? '180deg' : '0deg' }],   
    },
    white: {
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    winText: {
      color: !losingPlayer ? '#333' : '#fff',
      transform: [{ rotate: !losingPlayer ? '180deg' : '0deg' }],   
    },
  });

  function getResult( int ){
    if ( int == losingPlayer ) {
      return(
        <Text style={styles.lossText}>You lost on time.</Text>
      )
    }
    return(
        <Text style={styles.winText}>You won!</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.white}>
        {getResult(1)}
      </View>
      <View style={styles.black}>
        {getResult(0)}
        <Button
          title='Back To Start'
          onPress={() => {
            backToStart();
          }}>
        </Button>
      </View>
    </View>
  );
}


