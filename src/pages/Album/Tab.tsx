import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import List from '@/pages/Album/List/index';
import Introduction from '@/pages/Album/Introduction';
import {
  GestureHandlerGestureEvent,
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {IProgram} from '@/models/album';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  onScrollDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (data: IProgram, index: number) => void;
}

class Tab extends React.Component<ITabProps, IState> {
  /**
   * state传递给navigationState
   * routes传递路由信息需要key，titile两个必须参数，icon可选
   */
  state = {
    routes: [
      {key: 'introduction', title: '简介'},
      {key: 'albums', title: '节目'},
    ],
    index: 1,
  };

  /**
   *
   * @param index 用于修改state中的index下标
   */
  onIndexChange = (index: number) => {
    this.setState({
      index,
    });
  };
  /**
   * 根据路由key决定需要渲染什么组件
   * @param param0
   */
  renderScene = ({route}: {route: IRoute}) => {
    const {panRef, tapRef, nativeRef, onScrollDrag, onItemPress} = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <List
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onScrollDrag={onScrollDrag}
            onItemPress={onItemPress}
          />
        );
    }
  };
  renderTabBar = (props: SceneRendererProps & {navigationState: IState}) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        tabStyle={styles.tabBar}
        labelStyle={styles.label}
        style={styles.tabStyle}
        indicatorStyle={styles.indicator}
      />
    );
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScene}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    width: 90,
  },
  label: {
    color: '#333',
  },
  tabStyle: {
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderColor: '#fff',
    elevation: 0,
  },
});

export default Tab;
