// import { Message } from '@/pages/Detail';
import {viewportWidth} from '@/utils/index';
import React from 'react';
import {
  Text,
  Animated,
  Easing,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Item from './item';

export interface Message {
  id: number;
  title: string;
}

export interface IBarrage extends Message {
  trackIndex: number;
  isFree?: boolean;
}

interface IProps {
  data: Message[];
  maxTrack: number;
  style?: StyleProp<ViewStyle>;
}

interface IState {
  data: Message[];
  list: IBarrage[][];
}

/**
 * [
 *  [{id:'',title}]
 *  [{id:'',title}]
 * ]
 * @param list
 * @param maxTrack
 */
function getTrackIndex(list: IBarrage[][], maxTrack: number) {
  for (let i = 0; i < maxTrack; i++) {
    const barragesOfTrack = list[i];
    if (!barragesOfTrack || barragesOfTrack.length === 0) {
      return i;
    }
    const lastBarragesOfTrack = barragesOfTrack[barragesOfTrack.length - 1];
    if (lastBarragesOfTrack.isFree) {
      return i;
    }
  }
  return -1;
}

function addbarrage(data: Message[], maxTrack: number, list: IBarrage[][]) {
  for (let i = 0; i < data.length; i++) {
    const trackIndex = getTrackIndex(list, maxTrack);
    if (trackIndex < 0) {
      continue;
    }
    if (!list[trackIndex]) {
      list[trackIndex] = [];
    }
    const barrage = {
      ...data[i],
      trackIndex,
    };
    list[trackIndex].push(barrage);
  }
  return list;
}

class Barrage extends React.Component<IProps> {
  state = {
    data: this.props.data,
    list: [this.props.data.map((item) => ({...item, trackIndex: 0}))],
  };
  /**
   *
   * @param nextProps
   * @param prevState 上一个状态
   */
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const {data, maxTrack} = nextProps;
    if (data !== prevState.data) {
      return {
        data,
        list: addbarrage(data, maxTrack, prevState.list),
      };
    }
    return null;
  }

  outSide = (data: IBarrage) => {
    const {list} = this.state;
    const newList = list.slice();
    if (newList.length > 0) {
      const {trackIndex} = data;
      // const deleteIndex = newList.indexOf(trackIndex);
      newList[trackIndex] = newList[trackIndex].filter(
        (item) => item.id !== data.id,
      );
      this.setState({
        list: newList,
      });
    }
  };

  renderItem = (item: IBarrage[], index: number) => {
    return item.map((barrage, index) => {
      return <Item key={barrage.id} data={barrage} outSide={this.outSide} />;
    });
  };

  render() {
    const {list, data} = this.state;
    const {style} = this.props;
    return (
      <View style={[styles.container, style]}>{list.map(this.renderItem)}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Barrage;
