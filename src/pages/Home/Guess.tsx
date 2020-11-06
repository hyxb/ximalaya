import React from 'react';
import {View, Image, Text, StyleSheet, Alert} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {FlatList} from 'react-native-gesture-handler';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '../../iconfont/index';

const mapStateToProps = ({home}: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelState> {
  /**
   * 组件加载完成后调用fetch获取数据
   */
  componentDidMount() {
    this.fetch();
  }

  /**
   *调用model的action进行网络数据的获取
   */
  fetch = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchGuess',
    });
  };

  _renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable
        style={styles.items}
        onPress={() => {
          Alert.alert('111');
        }}>
        <Image source={{uri: item.image}} style={styles.images} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };

  render() {
    const {guess} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <IconFont name={'icon-Heart'} />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.moreTitle}>更多</Text>
            <IconFont name={'icon-arrow-right-bold'} />
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={guess}
          numColumns={3}
          renderItem={this._renderItem}
        />
        <Touchable onPress={this.fetch} style={styles.changeGuess}>
          <IconFont name={'icon-select-bold'} />
          <Text style={styles.changeGuesseTitle}>换一批</Text>
        </Touchable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    marginTop: 15,
    paddingLeft: 8,
    paddingRight: 8,
    elevation: 2,
  },
  images: {
    height: 100,
    width: '100%',
    borderRadius: 8,
    marginBottom: 15,
  },
  items: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 3,
    marginLeft: 3,
  },
  headerTitle: {
    marginLeft: 3,
    color: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginRight: 3,
    marginBottom: 3,
  },
  moreTitle: {
    color: '#6f6f6f',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeGuesseTitle: {
    color: '#6f6f6f',
    marginLeft: 5,
  },
  list: {
    padding: 10,
  },
});

export default connector(Guess);
