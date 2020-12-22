import React from 'react';
import {View, Text, StyleSheet, Image, Animated, Easing} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {ModalStackNavigation, RootStackParamList} from '@/navigator/index';
import coverRight from '@/assets/cover-right.png';
import {BlurView} from '@react-native-community/blur';
import Tab, {ITabProps} from './Tab';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';
import {IProgram} from '@/models/album';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
  navigation: ModalStackNavigation;
}

const USE_NATIVE_DRIVER = true;

const HEADER_HEIGHT = 260;

class Album extends React.Component<IProps, ITabProps> {
  RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0];
  translationY = new Animated.Value(0);
  translationYValue = 0;
  translationYOffset = new Animated.Value(0);
  translateY = Animated.add(this.translationY, this.translationYOffset);

  tapRef = React.createRef<TapGestureHandler>();
  panRef = React.createRef<PanGestureHandler>();
  nativeRef = React.createRef<NativeViewGestureHandler>();

  lastScrollYValue = 0;
  lastScrollY = new Animated.Value(0);

  componentDidMount() {
    const {dispatch, route, author} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id: id,
      },
    });

    Animated.spring(this.translationY, {
      toValue: 0,
      tension: 100,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  }

  onItemPress = (data: IProgram, index: number) => {
    const {navigation, dispatch, list, route} = this.props;
    const previousItem = list[index - 1];
    const nextItem = list[index + 1];
    navigation.navigate('Detils', {id: data.id});
    dispatch({
      type: 'player/setState',
      payload: {
        previousId: previousItem ? previousItem.id : '',
        nextId: nextItem ? nextItem.id : '',
        sounds: list.map((item) => ({id: item.id, title: item.title})),
        title: data.title,
        thumbnailUrl: route.params.item.image,
      },
    });
  };

  // 监听FlatList滚动
  onScrollBeginDrag = Animated.event<{contentOffset: {y: number}}>(
    [{nativeEvent: {contentOffset: {y: this.lastScrollY}}}],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}) => {
        this.lastScrollYValue = nativeEvent.contentOffset.y;
      },
    },
  );

  renderHeader = () => {
    const {headerHeight, route, summary, author} = this.props;
    const {title, image} = route.params.item;
    return (
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <Image source={{uri: image}} style={styles.background} />
        <BlurView
          style={StyleSheet.absoluteFillObject}
          blurType="light"
          blurAmount={5}
        />
        <View style={styles.leftView}>
          <Image source={coverRight} style={styles.coverRight} />
          <Image source={{uri: image}} style={styles.thumbnail} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: image}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  onGestureEvent = Animated.event([
    {nativeEvent: {translationY: this.translationY}},
  ]);

  onHandlerStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    //上一次状态是否是活动状态
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent;
      //offset = value ;
      this.translationYOffset.extractOffset();
      this.translationYOffset.setValue(translationY);
      // value = vlaue + offset
      this.translationYOffset.flattenOffset();
      this.translationY.setValue(0);
      this.translationYValue += translationY;
      if (this.translationYValue < this.RANGE[0]) {
        /**
         *
         */
        this.translationYValue = this.RANGE[0];
        // this.translationYOffset
        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[0],
          // duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
      } else if (this.translationYValue > this.RANGE[1]) {
        this.translationYValue = this.RANGE[1];

        Animated.timing(this.translationYOffset, {
          toValue: this.RANGE[1],
          // duration: 1000,
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
      }
    }
  };

  render() {
    const {headerHeight, route} = this.props;
    const {title, image} = route.params.item;
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: this.translateY.interpolate({
                    inputRange: this.RANGE,
                    outputRange: this.RANGE,
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}>
          {this.renderHeader()}
          <View style={{height: viewportHeight - this.props.headerHeight}}>
            <Tab
              panRef={this.panRef}
              tapRef={this.tapRef}
              nativeRef={this.nativeRef}
              onItemPress={this.onItemPress}
              onScrollDrag={this.onScrollBeginDrag}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject, //绝对定位
  },
  header: {
    height: 260,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#f43',
    alignItems: 'center',
  },
  leftView: {
    marginRight: 26,
    marginBottom: 30,
  },
  rightView: {
    flex: 1,
    marginBottom: 30,
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -20,
    resizeMode: 'contain',
  },
  summary: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  summaryText: {
    color: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 6,
  },
});

function Wrapper(props: IProps) {
  const HH = useHeaderHeight();
  return <Album {...props}  headerHeight={HH}/>;
}

export default connector(Wrapper);
