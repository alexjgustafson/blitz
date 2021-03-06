import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/start'
import Play from './components/play'
import Result from './components/result'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activePlayer: -1, // -1 to pause game, 0 for black to decrement, 1 for white to decrement
      blackTime: 0,
      boardPosition: false, // false for left, true for right
      losingPlayer: -1, // Use the same values as active player once we have a loser
      mode: 'start',  // 'start', 'play', and 'result' are valid
      timeControl: 300000, // 300000 = 5 minutes in milliseconds
      timeControlEditable: false,
      whiteTime: 0,
    };

    this.backToStart = this.backToStart.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
    this.changeActivePlayer = this.changeActivePlayer.bind(this);
    this.handleTap = this.handleTap.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.toggleBoardPosition = this.toggleBoardPosition.bind(this);
    this.updateTimeControlEditable = this.updateTimeControlEditable.bind(this);
    this.updateTimeControlValue = this.updateTimeControlValue.bind(this);
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

  componentDidMount(){
    const decrementInterval = 100;
    this.timerID = setInterval(
      () => this.spendTime(decrementInterval),
      decrementInterval
    );
  }

  componentDidUpdate(prevProps, prevState){
    //Check to see if someone has lost on time
    const zeroTime = prevState.blackTime <= 0 || prevState.whiteTime <=0 ;
    const playMode = prevState.mode == 'play';
    const notPaused = prevState.activePlayer != -1;
    if( zeroTime && playMode && notPaused){
      return this.lossOnTime(prevState.activePlayer);
    }
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  handleTap( int ){
    // Taps only matter for the active player
    if ( this.state.activePlayer != int ) {
      return;
    }
    this.setState({ activePlayer: int ? 0 : 1 })
  }

  lossOnTime( losingPlayer ){
    this.setState({
      mode: 'result',
      losingPlayer: losingPlayer,
    });
  }

  pauseGame(){
    this.changeActivePlayer(-1);
  }

  spendTime( int ){
    this.setState( function(state){
      //Don't run clock if we're not in play mode
      if( state.mode != 'play'){
        return state;
      }
      //Don't run clock if theres not an active player (paused)
      if( state.activePlayer == -1 ){
        return state;
      }
      return {
        whiteTime: state.activePlayer ? state.whiteTime - int : state.whiteTime,
        blackTime: state.activePlayer ? state.blackTime : state.blackTime - int,
      };
    } );
  }

  toggleBoardPosition(){
    this.setState( prevState => ( {
      boardPosition: !prevState.boardPosition
    } ) )
  }

  updateTimeControlEditable(bool){
    this.setState({timeControlEditable: bool});
  }

  updateTimeControlValue(int){
    this.setState({timeControl: int});
  }

  render(){    
    const startSettings = {
      boardPosition: this.state.boardPosition,
      onBoardPositionChange: this.toggleBoardPosition,
      onPlay: this.beginPlay,
      timeControl: this.state.timeControl,
      timeControlEditable: this.state.timeControlEditable,
      updateTimeControlEditable: this.updateTimeControlEditable,
      updateTimeControlValue: this.updateTimeControlValue,
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

    const resultSettings = {
      backToStart: this.backToStart,
      losingPlayer: this.state.losingPlayer,
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
          <Result settings={resultSettings} />
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
