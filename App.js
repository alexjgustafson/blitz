import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  state = {
    mode: 'newGame',  // newGame, play, and result
    timeControl: 300, // 5 minutes in seconds
    boardPosition: 0, // 0 for left, 1 for right
    whiteTime: 0,
    blackTime: 0,
    activePlayer: -1, // -1 to pause game, 0 for black to decrement, 1 for white to decrement
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  render(){
    return(
        <View style={this.styles.container}>
        <Text>Hello, world!</Text>
        </View>
    )
  }
}
