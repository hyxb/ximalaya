import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  console.log('TopTabBarWrapper log', home.carousels);

  return {
    // activeCarouseIndex: home.activeCarouseIndex,
    linearColors: home.carousels
      ? home.carousels[home.activeCarouseIndex].colors
      : undefined,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

/**
 * 此处是由于interface无法继承多个类型，所以使用type，用联合类型继承多个类型，
 */
type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  get linearGradient() {
    const {linearColors = ['#000000', '#ffffff']} = this.props;
    console.log('LinearGradient log', linearColors);
    return (
      <LinearGradient style={styles.tabBar} colors={['#123435', '#ede343']} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <LinearGradient style={styles.tabBar} colors={['#123435', '#ede343']} />
        <View style={styles.topTabTarView}>
          <MaterialTopTabBar {...this.props} style={styles.tabBar} />
          <Touchable style={styles.categoryBtn}>
            <Text>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
    paddingBottom: 5,
  },
  topTabTarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    paddingRight: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  bottom: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyBtn: {
    marginLeft: 10,
    paddingRight: 4,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, //绝对布局
    height: 460,
  },
});

export default connector(TopTabBarWrapper);
