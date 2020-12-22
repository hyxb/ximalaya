import {viewportWidth} from '@/utils/index';
import React from 'react';
import {Animated, Easing, StyleSheet, Text} from 'react-native';
import {IBarrage, Message} from '.';

interface IProps {
  data: IBarrage;
  outSide: (data: IBarrage) => void;
}

//使用pureComponent可以减少不必要的渲染
class Item extends React.PureComponent<IProps> {
  translateX = new Animated.Value(0);
  componentDidMount() {
    const {outSide, data} = this.props;
    Animated.timing(this.translateX, {
      toValue: 10,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        outSide(data);
      }
    });
    this.translateX.addListener(({value}) => {
        if(value > 3 ){
          data.isFree = true
        }
    })
  }

  render() {
    const {data} = this.props;
    const width = data.title.length * 15;
    return (
      <Animated.View
        style={{
          position: 'absolute',
          // top: Math.random() *30,
          top: data.trackIndex * 30,
          transform: [
            {
              translateX: this.translateX.interpolate({
                inputRange: [0, 10],
                outputRange: [viewportWidth, -width],
              }),
            },
          ],
        }}>
        <Text style={styles.barrage}>{data.title}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  barrage: {
    color: '#fff',
  },
});

export default Item;
