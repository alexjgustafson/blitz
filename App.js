import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/start'
import Play from './components/play'
import Result from './components/result'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'start',  // start, play, and result
      timeControl: 300, // 5 minutes in seconds
      boardPosition: false, // false for left, true for right
      whiteTime: 0,
      blackTime: 0,
      activePlayer: -1, // -1 to pause game, 0 for black to decrement, 1 for white to decrement
    }

    this.toggleBoardPosition = this.toggleBoardPosition.bind(this);
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  toggleBoardPosition(){
    this.setState( prevState => ( {
      boardPosition: !prevState.boardPosition
    } ) )
  }

  render(){    
    const startSettings = {
      boardPosition: this.state.boardPosition,
      onBoardPositionChange: this.toggleBoardPosition,
      timeControl: this.state.timeControl,
    };

    switch ( this.state.mode ) {
      case 'start':
        return(
          <Start settings={startSettings} />
        )
        break;
      case 'play':
        return(
          <Play />
        )
        break;
      case 'result':
        return(
          <Result />
        )
        break;
      default:
        return(
          <View style={this.styles.container}>
            <Text>Invalid mode</Text>
          </View>
        )
        break;
    }
  }
}
