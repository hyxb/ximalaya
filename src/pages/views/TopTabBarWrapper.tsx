import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Touchable from '@/components/Touchable';
import LinearGradient from 'react-native-linear-animated-gradient-transition';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({home}: RootState) => {
  console.log('TopTabBarWrapper log', home.carousels);
  //['#123ded','#ded345']
  if (home.carousels.length !== 0) {
    console.log('Carousels is true');
  } else {
    console.log('Carousels is false');
  }

  /**
   * 判断carousel长度判断是否能取到颜色，否者此处报错undefined
   * true条件一直报错，当第一次状态库没有数据的时候取空报错
   * 无奈只能加个判断不为零
   * 傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug傻逼bug
   */
  return {
    gradientVisible: home.gradientVisible,
    linearColors:
      home.carousels.length !== 0
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
  goCategory = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };

  get linearGradient() {
    const {linearColors = ['#000000', '#ffffff'], gradientVisible} = this.props;
    if (gradientVisible) {
      return <LinearGradient style={styles.gradient} colors={linearColors} />;
    }
    return null;
  }

  render() {
    const {gradientVisible, indicatorStyle, ...restProps} = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    let newIndicatorStyle = indicatorStyle;
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        newIndicatorStyle = StyleSheet.compose(
          indicatorStyle,
          styles.whiteBackgroud,
        );
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <LinearGradient style={styles.tabBar} colors={['#123435', '#ede343']} />
        <View style={styles.topTabTarView}>
          <MaterialTopTabBar
            {...restProps}
            activeTintColor={activeTintColor}
            indicatorStyle={newIndicatorStyle}
            style={styles.tabBar}
          />
          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottom}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索按钮</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
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
    height: 260,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBackgroud: {
    backgroundColor: '#fff',
  },
});

export default connector(TopTabBarWrapper);
