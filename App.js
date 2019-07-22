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

    this.beginPlay = this.beginPlay.bind(this);
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

  beginPlay(){
    this.setState(prevState => ({
      mode: 'play',
      whiteTime: prevState.timeControl,
      blackTime: prevState.timeControl,
      activePlayer: 0
    }) );
  }

  toggleBoardPosition(){
    this.setState( prevState => ( {
      boardPosition: !prevState.boardPosition
    } ) )
  }

  render(){    
    const startSettings = {
      boardPosition: this.state.boardPosition,
      onBoardPositionChange: this.toggleBoardPosition,
      onPlay: this.beginPlay,
      timeControl: this.state.timeControl,
    };

    const playSettings = {
      boardPosition: this.state.boardPosition, 
      whiteTime: this.state.whiteTime,
      blackTime: this.state.blackTime,
      activePlayer: this.state.activePlayer, 
    }

    switch ( this.state.mode ) {
      case 'start':
        return(
          <Start settings={startSettings} />
        )
        break;
      case 'play':
        return(
          <Play settings={playSettings} />
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
