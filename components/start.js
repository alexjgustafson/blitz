import React, {Component} from 'react';
import { TextInput, TouchableWithoutFeedback, Button, StyleSheet, Text, View } from 'react-native';

class Start extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      timeControlMinutes: this.getMinutes( this.props.settings.timeControl / 1000 ),
      timeControlSeconds: this.getRemainderSeconds( this.props.settings.timeControl / 1000 ),
    };

    this.saveTimeControl = this.saveTimeControl.bind(this);
  }

  getRemainderSeconds( int ){
    return int % 60;
  }

  getMinutes( int ){
    const remainder = int % 60;
    const whole = int - remainder;
    if( !whole ){
      return 0;
    }
    return whole / 60;
  }

  saveTimeControl( mins, secs ){
    let ms = mins * 60 * 1000;
    ms += secs * 1000;
    this.props.settings.updateTimeControlValue(ms);
    this.props.settings.updateTimeControlEditable(false);
  }
  
  
  render(){
    const {boardPosition, onBoardPositionChange, onPlay, timeControlEditable, updateTimeControlEditable} = this.props.settings;
  
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <>
      <View style={styles.container}>
        { !timeControlEditable && 
        <TouchableWithoutFeedback 
          onPress={() => updateTimeControlEditable(true)}>
          <Text>{this.state.timeControlMinutes}:{this.state.timeControlSeconds}</Text>
        </TouchableWithoutFeedback> }
        { timeControlEditable &&
          <View>
          <Text>Minutes</Text>
          <TextInput       
            label= 'Minutes'
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {
              if( '' == text ){
                return this.setState({timeControlMinutes: null});
              }
              this.setState({timeControlMinutes: parseInt(text)}) 
            } }
            value={this.state.timeControlMinutes ? this.state.timeControlMinutes.toString() : ''}
            keyboardType='number-pad'
            editable={timeControlEditable}
          />
          <Text>Seconds</Text>
          <TextInput
            label= 'Seconds'
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {
              if( '' == text ){
                return this.setState({timeControlSeconds: null});
              }
              this.setState({timeControlSeconds: parseInt(text)})
            }}
            value={this.state.timeControlSeconds ? this.state.timeControlSeconds.toString() : ''}
            keyboardType='number-pad'
            editable={timeControlEditable}
          />
          <Button 
            title="Save New Time Control"
            onPress={() => this.saveTimeControl(this.state.timeControlMinutes, this.state.timeControlSeconds)}
          ></Button>
          </View>
        }
      </View>
      <View style={styles.container}>
        <Button onPress={() => onBoardPositionChange()} title="Toggle Board Position"></Button>
        <Text>Board position is {boardPosition ? `Right` : `Left`}</Text>
        <Button onPress={() => onPlay()} title="Play"></Button>
      </View>
      </>
    );
  }
}
export default Start



