import React, {Component} from 'react';
import { TextInput, TouchableWithoutFeedback, Button, StyleSheet, Text, View } from 'react-native';
import Svg,{
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

class Start extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      timeControlMinutes: this.getMinutes( this.props.settings.timeControl / 1000 ),
      timeControlSeconds: this.getRemainderSeconds( this.props.settings.timeControl / 1000 ),
    };

    this.saveTimeControl = this.saveTimeControl.bind(this);
  }

  displayMinutes(int){
    if( int >= 10){
      return int.toString();
    }
    return `0${int}`;
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
      white: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      angle:{
        color: '#fff',
        fontSize: 22,
        lineHeight: 22,
        paddingBottom: 4,
      },
      black: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
      },
      boardWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: boardPosition ? 'flex-end' : 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
      },
      buttonWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      timeDisplay:{
        fontSize: 48,
      },
    });

    return (
      <>
      <View style={styles.white}>
        { !timeControlEditable && 
        <TouchableWithoutFeedback 
          onPress={() => updateTimeControlEditable(true)}>
          <Text style={styles.timeDisplay}>{this.state.timeControlMinutes ? this.state.timeControlMinutes : '00'}:{this.displayMinutes(this.state.timeControlSeconds)}</Text>
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
            label='Seconds'
            maxLength={2}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => {
              if( '' == text ){
                return this.setState({timeControlSeconds: null});
              }
              if( parseInt(text) >= 60 ){
                return this.setState({timeControlSeconds: 59});
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
      <View style={styles.black}>
        <View style={styles.boardWrapper}>
          { !boardPosition && 
          <Text style={styles.angle}>&lang;</Text>
          }
          <Svg viewBox="0 0 12.7 15.875" width="40" height="40"><G transform="translate(0,-284.29998)"><Path style="" d="m 1.1159598,284.82915 a 0.57753781,0.57753781 0 0 0 -0.57774419,0.57774 v 10.4867 a 0.57753781,0.57753781 0 0 0 0.57774419,0.57723 H 11.58404 a 0.57753781,0.57753781 0 0 0 0.577745,-0.57723 v -10.4867 a 0.57753781,0.57753781 0 0 0 -0.577745,-0.57774 z m 1.210257,0.43357 H 3.598995 v 1.27279 H 2.3262168 Z m 2.7099154,0 h 1.2727781 v 1.27279 H 5.0361322 Z m 2.7099154,0 h 1.2727781 v 1.27279 H 7.7460476 Z m 2.7099154,0 h 1.272778 v 1.27279 h -1.272778 z m -9.48470385,1.35753 H 2.2440637 v 1.27228 H 0.97125915 Z m 2.70991535,0 h 1.2727781 v 1.27228 H 3.6811745 Z m 2.7099154,0 H 7.663868 v 1.27228 H 6.3910899 Z m 2.7099154,0 h 1.2727777 v 1.27228 H 9.1010053 Z M 2.3262168,287.9778 H 3.598995 v 1.27227 H 2.3262168 Z m 2.7099154,0 h 1.2727781 v 1.27227 H 5.0361322 Z m 2.7099154,0 h 1.2727781 v 1.27227 H 7.7460476 Z m 2.7099154,0 h 1.272778 v 1.27227 h -1.272778 z m -9.48470385,1.35754 H 2.2440637 v 1.27227 H 0.97125915 Z m 2.70991535,0 h 1.2727781 v 1.27227 H 3.6811745 Z m 2.7099154,0 H 7.663868 v 1.27227 H 6.3910899 Z m 2.7099154,0 h 1.2727777 v 1.27227 H 9.1010053 Z m -6.7747885,1.35754 H 3.598995 v 1.27227 H 2.3262168 Z m 2.7099154,0 h 1.2727781 v 1.27227 H 5.0361322 Z m 2.7099154,0 h 1.2727781 v 1.27227 H 7.7460476 Z m 2.7099154,0 h 1.272778 v 1.27227 H 10.455963 Z M 0.97125915,292.0499 H 2.2440637 v 1.27279 H 0.97125915 Z m 2.70991535,0 h 1.2727781 v 1.27279 H 3.6811745 Z m 2.7099154,0 H 7.663868 v 1.27279 H 6.3910899 Z m 2.7099154,0 h 1.2727777 v 1.27279 H 9.1010053 Z m -6.7747885,1.35754 H 3.598995 v 1.27279 H 2.3262168 Z m 2.7099154,0 h 1.2727781 v 1.27279 H 5.0361322 Z m 2.7099154,0 h 1.2727781 v 1.27279 H 7.7460476 Z m 2.7099154,0 h 1.272778 v 1.27279 h -1.272778 z m -9.48470385,1.35754 H 2.2440637 v 1.27279 H 0.97125915 Z m 2.70991535,0 h 1.2727781 v 1.27279 H 3.6811745 Z m 2.7099154,0 H 7.663868 v 1.27279 H 6.3910899 Z m 2.7099154,0 h 1.2727777 v 1.27279 H 9.1010053 Z" fill="#ffffff" stroke="none"/></G></Svg>
          { boardPosition && 
          <Text style={styles.angle}>&rang;</Text>
          }
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => onBoardPositionChange()} title="Switch Side"></Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => onPlay()} title="Play"></Button>
        </View>
      </View>
      </>
    );
  }
}
export default Start



