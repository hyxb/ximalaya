import React from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel, {sideHeight} from '@/pages/Home/Carousel';
import Guess from './Guess';
import Config from 'react-native-config';
import ChannelItem from './ChannelItem';
import {IChannel, IGuess} from '@/models/home';
import {HomeParamList} from '@/navigator/HomeTabs';
import {RouteProp} from '@react-navigation/native';

//BUG Config.API_URL is  undefined  ???
// console.log('CONFIG : ' + Config.API_URL);

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList, string>},
) => {
  const {namespace} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    loading: state.loading.effects[namespace + '/fetchChannel'],
    gradientVisible: modelState.gradientVisible,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  state = {
    refreshing: false,
  };

  componentDidMount() {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchChannel', //type写错下面channels就读不到数据了，不报错也没数据
    });
    dispatch({
      type: namespace + '/fetchCarousels',
    });
  }

  /**
   * goALbum用于跳转到频道页面，在guess或者Channel都可以使用
   * @param data 使用|，表明参数可以是IChannel或者IGuess
   */
  goAlbum = (data: IChannel | IGuess) => {

    const {navigation} = this.props;
    navigation.navigate('Album',{item:data});
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.goAlbum} />;
  };
  //刷新
  onRefresh = () => {
    //修改状态为true
    this.setState({
      refreshing: true,
    });


    //获取数据
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchChannel',
      callback: () => {
        this.setState({
          refreshing: false,
        });
      },
    });

    //修改状态为false
  };

  onEndReached = () => {
    const {dispatch, loading, hasMore, namespace} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: namespace + '/fetchChannel',
      payload: {
        loadMore: true,
      },
    });
  };

  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < sideHeight;
    const {dispatch, gradientVisible, namespace} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel namespace={namespace} />
        <View style={styles.background}>
          {/* goAlbum传递给Guess组件，使guess也能跳转 */}
          <Guess namespace={namespace} goAlbum={this.goAlbum}/> 
        </View>
      </View>
    );
  }

  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text style={styles.bottomFont}>我是有底线的</Text>
        </View>
      );
    }

    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.end}>
          <Text style={styles.bottomFont}>正在加载..</Text>
        </View>
      );
    }
  }

  get empty() {
    const {loading} = this.props;
    if (loading) return;

    return (
      <View style={styles.empty}>
        <Text style={styles.bottomFont}>暂无数据</Text>
      </View>
    );
  }

  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.5}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomFont: {
    color: '#7e7474',
  },
  empty: {
    alignItems: 'center',
    padding: 100,
  },
  background: {
    backgroundColor: '#fff',
  },
});
export default connector(Home);
