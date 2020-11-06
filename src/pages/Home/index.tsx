import React from 'react';
import {
  Button,
  Text,
  View,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Carousel from '@/pages/Home/Carousel';
import Guess from './Guess';
import Config from 'react-native-config';
import ChannelItem from './ChannelItem';
import {IChannel} from '@/models/home';
// import { ScrollView } from 'react-native-gesture-handler';
// import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-snap-carousel';

// import ConnectedProps from 'index'
// import { NavigationContainer } from '@react-navigation/native';

//BUG Config.API_URL is  undefined  ???
console.log('CONFIG : ' + Config.API_URL);

const mapStateToProps = ({home}: RootState) => {
  return {
    carousels: home.carousels,
    channels: home.channels,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface IProps extends MadelState {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
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
  
  onRefresh = () => {};

  onEndReached = () => {
    const {dispatch} = this.props;
    console.log('--loading-more---')
    dispatch({
      type: 'home/fetchChannel', 
      payload:{
        loadMore:true;
      }
    });
  };

  get header() {
    const {carousels} = this.props;
    return (
      <View>
        <Carousel data={carousels} />
        <Guess />
      </View>
    );
  }

  render() {
    const {channels} = this.props;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
      />
    );
  }
}
export default connector(Home);
