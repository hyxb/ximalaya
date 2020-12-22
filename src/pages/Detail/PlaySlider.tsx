import {RootState} from '@/models/index';
import {formaTime} from '@/utils/index';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from 'react-native-slider-x';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({player}: RootState) => {
  return {
    playState: player.playState,
    currentTime: player.currentTime,
    duration: player.duration,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PlaySlider extends React.Component<IProps> {

  renderThumb = () => {
    const {currentTime, duration} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {formaTime(currentTime)}/{formaTime(duration)}
        </Text>
      </View>
    );
  };
  onSlidingComplete = (value:number) => {
    const {dispatch,currentTime} = this.props;
    dispatch({
      type:'player/currentChange',
      payload:{
        currentTime:value,
      }
    })
    console.log('onSlidingComplete value is:',value);
    console.log('onSlidingCOmplete currentTime is ',currentTime)
  }

  render() {
    const {currentTime, duration} = this.props;
    return (
      <View>
        <Slider
          value={currentTime}
          maximumValue={duration}
          maximumTrackTintColor="rgba(255,255,255,0.3"
          minimumTrackTintColor="#fff"
          renderThumb={this.renderThumb}
          thumbStyle={styles.thumb}
          onSlidingStart={this.onSlidingComplete}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  thumb: {
    backgroundColor: '#fff',
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
  },
});

export default connector(PlaySlider);
