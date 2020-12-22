import Barrage, {Message} from '@/components/Barrage';
import Touchable from '@/components/Touchable';
import IconFont from '@/iconfont/index';
import {RootState} from '@/models/index';
import {viewportWidth} from '@/utils/index';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {Easing} from 'react-native-reanimated';
import {connect, ConnectedProps} from 'react-redux';
import {ModalStackNavigation, ModelStackParamList} from '../../navigator';
import PlaySlider from './PlaySlider';

const mapStateToProps = ({player}: RootState) => {
  return {
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    previousId: player.previousId,
    nextId: player.nextId,
    thumbnailUrl: player.thumbnailUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<ModelStackParamList, 'Detils'>;
  navigation: ModalStackNavigation;
}

interface IState {
  barrage: boolean;
  barrageData: Message[];
}

const IMAGE_WIDTH = 180;

const IMAGE_HEIGHT = 180;

const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;

const SCALE = viewportWidth / IMAGE_WIDTH;

const data = [
  '我是弹幕',
  '我也是弹幕嘻嘻嘻我是弹幕',
  '嘻嘻嘻我是弹幕嘻嘻嘻我是弹幕嘻嘻嘻我是弹幕嘻嘻嘻我是弹幕',
  '你才是弹幕',
  '你是弹幕嘻嘻嘻我是弹幕',
];

function reandomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getText() {
  return data[reandomIndex(data.length)];
}

class Detils extends React.Component<IProps, IState> {
  state = {
    barrage: false,
    barrageData: [],
  };

  anim = new Animated.Value(1);

  componentDidMount() {
    /**
     * 2020/12/18 bug日志，dispatch不调用player的异步函数
     * 原因是model模块的index中models数组没有包含player
     * 导致没有导出player模块对象。
     */
    const {dispatch, route, navigation, title} = this.props;
    dispatch({
      type: 'player/fetchShow',
      payload: {
        id: route.params.id,
      },
    });

    navigation.setOptions({
      headerTitle: title,
    });
    console.log('componentDidMount!');
    this.addBarrage();
  }

  componentDidUpdate(prevProps: IProps) {
    // const {nextId, previousId} = this.props;

    console.log('new Title:', prevProps.title);
    if (prevProps.title !== this.props.title) {
      this.props.navigation.setOptions({
        /**
         * 这里使用传入的prevprops与this.props.title结果不一样，
         * 使用prevprops导致标题更新延迟一次
         * 使用this.props才能正确更新
         */
        headerTitle: this.props.title,
      });
    }
  }

  addBarrage = () => {
    setInterval(() => {
      const {barrage} = this.state;
      if (barrage) {
        const id = Date.now();
        const title = getText();
        this.setState({
          barrageData: [{id, title}],
        });
      }
    }, 70);
  };

  toggle = () => {
    const {dispatch, playState} = this.props;
    console.log('Touch and PlayState is :', playState);
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };

  previous = () => {
    const {dispatch, playState, previousId} = this.props;
    if (previousId === '') {
      console.log('No previous!');
      return;
    }

    console.log('previous press');
    dispatch({
      type: 'player/previous',
    });
  };
  next = () => {
    const {dispatch, playState, nextId} = this.props;
    if (nextId === '') {
      console.log('No Next!');
      return;
    }
    console.log('next press');
    dispatch({
      type: 'player/next',
    });
  };

  barrage = () => {
    /**
     * 经测算setState的状态不会立即改变，
     * 执行前后的日志表示barrage的值没有发生变化，猜测在barrage方法执行完成后才改变状态
     */
    this.setState({
      barrage: !this.state.barrage,
    });
    Animated.timing(this.anim, {
      toValue: this.state.barrage ? 1 : SCALE,
      duration: 200,
      easing: Easing.ease,
    }).start();
  };

  render() {
    const {playState, previousId, nextId, thumbnailUrl} = this.props;
    const {barrage, barrageData} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={{uri: thumbnailUrl}}
            style={[
              styles.image,
              {borderRadius: barrage ? 0 : 8},
              {transform: [{scale: this.anim}]},
            ]}
          />
        </View>
        {barrage && (
          <React.Fragment>
            <LinearGradient
              colors={['rgba(128,104,102,0.5)', '#807c66']}
              style={styles.linear}
            />
            <Barrage
              data={barrageData}
              maxTrack={5}
              style={{top: PADDING_TOP}}
            />
          </React.Fragment>
        )}
        <Touchable style={styles.barrageBtn} onPress={this.barrage}>
          <Text style={styles.barrageTexxt}>弹幕</Text>
        </Touchable>
        <PlaySlider />
        <View style={styles.buttonView}>
          <Touchable
            disabled={!previousId}
            onPress={this.previous}
            style={styles.button}>
            <IconFont name="icon-left-circle" size={50} color={'#fff'} />
          </Touchable>
          <Touchable onPress={this.toggle} style={styles.button}>
            <IconFont
              name={
                playState === 'playing' ? 'icon-timeout' : 'icon-play-circle'
              }
              size={50}
              color={'#fff'}
            />
          </Touchable>
          <Touchable
            disabled={!nextId}
            onPress={this.next}
            style={styles.button}>
            <IconFont name="icon-right-circle" size={50} color={'#fff'} />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  buttonView: {
    flexDirection: 'row',
    // alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    height: IMAGE_HEIGHT,
    // alignContent:'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrageBtn: {
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 10,
  },
  barrageTexxt: {
    color: '#fff',
  },
  linear: {
    position: 'absolute', //绝对定位
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detils);
