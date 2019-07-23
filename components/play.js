import React, {Component} from 'react';
import { Button, Modal, TouchableHighlight, StyleSheet, Text, View } from 'react-native';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      prevActivePlayer: -1,
    };
    
    this.handleLongPress = this.handleLongPress.bind(this);
    this.restartCurrentGame = this.restartCurrentGame.bind(this);
  }
  
  handleLongPress(){
    this.setState({prevActivePlayer: this.props.settings.activePlayer})
    this.props.settings.pauseGame();
    this.setModalVisible(true);
  }

  restartCurrentGame(){
    this.setModalVisible(false);
    this.props.settings.restartGame();
  }

  returnCurrentGame(int){
    this.setModalVisible(false);
    this.props.settings.changeActivePlayer(int);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  render(){
    const {activePlayer, backToStart, blackTime, boardPosition, onTap, whiteTime} = this.props.settings;
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
      },
      container: {
        flex: 1,
      },
      rotateWrapper: {
        transform: [{ rotate: boardPosition ? '-90deg' : '90deg' }],    
      },
      tenths: {
        fontSize: 10,
      },
      white: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      whiteText: {
        fontSize: activePlayer ? 48 : 20,
      },
    });

    function displayTime( ms ){
      const tenths = ms % 1000;
      const displayTenths = tenths / 100;
      const seconds = ((ms - tenths) / 1000) % 60;
      const minutesInSeconds = (( ms - tenths ) / 1000) - seconds;
      const displayMinutes = minutesInSeconds ? minutesInSeconds / 60 : 0;

      function leadingZero( int ){
        let string = int < 10 ? '0' : '';
        return string += int;
      }
      return(
        <Text>{`${leadingZero(displayMinutes)}:${leadingZero(seconds)}`}<Text style={styles.tenths}>{displayTenths}</Text></Text>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.white} onLongPress={this.handleLongPress} onPress={ () => onTap(1) } underlayColor='#ccc'>
          <View style={styles.rotateWrapper}>
            <Text style={styles.whiteText}>{ activePlayer ? '♔' : ''}</Text>
            <Text style={styles.whiteText}>{displayTime(whiteTime)}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.black} onLongPress={this.handleLongPress} onPress={ () => onTap(0) } underlayColor='#555'>
          <View style={styles.rotateWrapper}>
            <Text style={styles.blackText}>{ !activePlayer ? '♔' : ''}</Text>
            <Text style={styles.blackText}>{displayTime(blackTime)}</Text>
          </View>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{marginTop: 22}}>
            <View>
              <Text>The game is paused</Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
              <Button
                title='Return to Game'
                onPress={() => {
                  this.returnCurrentGame(this.state.prevActivePlayer);
                }} />

              <Button
                title='Back To Start'
                onPress={() => {
                  backToStart();
                }}>
              </Button>

              <Button
                title='Restart Current Game'
                onPress={() => {
                  this.restartCurrentGame();
                }}>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Play


