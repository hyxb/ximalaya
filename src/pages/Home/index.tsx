import React from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel from '@/pages/Home/Carousel';
import Guess from './Guess';
import Config from 'react-native-config';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';


//BUG Config.API_URL is  undefined  ???
console.log('CONFIG : ' + Config.API_URL);

const mapStateToProps = ({home, loading}: RootState) => {
  return {
    carousels: home.carousels,
    channels: home.channels,
    hasMore: home.pagination.hasMore,
    loading: loading.effects['home/fetchChannel'],
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
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannel', //type写错下面channels就读不到数据了，不报错也没数据
    });
    dispatch({
      type: 'home/fetchCarousels',
    });
  }

  onPress = (data: IChannel) => {
    console.log('index.data:', data);
  };

  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };
  //刷新
  onRefresh = () => {
    //修改状态为true
    this.setState({
      refreshing: true,
    });

    console.log('onRefresh  start !!! ');

    //获取数据
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannel',
      callback: () => {
        console.log('CallBack! start');
        this.setState({
          refreshing: false,
        });
      },
    });

    //修改状态为false
  };

  onEndReached = () => {
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) {
      return;
    }
    console.log('--loading-more---');
    dispatch({
      type: 'home/fetchChannel',
      payload: {
        loadMore: true,
      },
    });
  };

  get header() {
    // const {carousels} = this.props;
    return (
      <View>
        <Carousel/>
        <Guess />
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
});
export default connector(Home);
