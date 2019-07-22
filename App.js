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

    this.backToStart = this.backToStart.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
    this.changeActivePlayer = this.changeActivePlayer.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
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

  backToStart(){
    this.setState({
      mode: 'start',
      whiteTime: 0,
      blackTime: 0,
      activePlayer: -1,
    });
  }

  beginPlay(){
    this.setState(prevState => ({
      mode: 'play',
      whiteTime: prevState.timeControl,
      blackTime: prevState.timeControl,
      activePlayer: 1
    }) );
  }

  changeActivePlayer(int){
    this.setState({activePlayer: int});
  }

  handleTap( int ){
    // Taps only matter for the active player
    if ( this.state.activePlayer != int ) {
      return;
    }
    this.setState({ activePlayer: int ? 0 : 1 })
  }

  pauseGame(){
    this.changeActivePlayer(-1);
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
      onTap: this.handleTap,
      backToStart: this.backToStart,
      restartGame: this.beginPlay,
      pauseGame: this.pauseGame,
      changeActivePlayer: this.changeActivePlayer,
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
