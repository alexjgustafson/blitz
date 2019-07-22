import React, {Component} from 'react';
import { Modal, TouchableHighlight, StyleSheet, Text, View } from 'react-native';

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    
    this.handleLongPress = this.handleLongPress.bind(this);
  }
  
  handleLongPress(){
    this.setModalVisible(true)
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
        transform: [{ rotate: boardPosition ? '-90deg' : '90deg' }],    
      },
      container: {
        flex: 1,
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
      <View style={styles.container}>
        <TouchableHighlight style={styles.white} onLongPress={this.handleLongPress} onPress={ () => onTap(1) } underlayColor='#ccc'>
          <Text style={styles.whiteText}>{ activePlayer ? '♔' : ''}{whiteTime}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.black} onLongPress={this.handleLongPress} onPress={ () => onTap(0) } underlayColor='#555'>
          <Text style={styles.blackText}>{ !activePlayer ? '♔' : ''}{blackTime}</Text>
        </TouchableHighlight>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{marginTop: 22}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

              <Text>---</Text>

              <TouchableHighlight
                onPress={() => {
                  backToStart();
                }}>
                <Text>Back To Start</Text>
              </TouchableHighlight>

              <Text>---</Text>

            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Play


