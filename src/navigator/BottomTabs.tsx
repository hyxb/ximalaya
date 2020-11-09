import React, {Component} from 'react';
import {
  // NavigationContainer,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import {
  // BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '@/pages/Home';
import Found from '@/pages/Found';
import Listen from '@/pages/Listen';
import Account from '@/pages/Account';
import index, {
  RootStackNavigation,
  RootStackParamList,
} from '@/navigator/index';
// import {State} from 'react-native-gesture-handler';
// import {CompositeNavigationProp} from '@react-navigation/native';
// import {HeaderTitle, StackNavigationProp} from '@react-navigation/stack';
import IconFont from '../iconfont/index';
import HomeTabs from '@/navigator/HomeTabs'
//路由列表类型
export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

//获取标签导航的导航器和路由
const Tab = createBottomTabNavigator();

//定义路由类型，导入路由属性列表
type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState;
};

// type BottomTabNavigation = BottomTabNavigationProp<RootStackNavigation>;

// 路由属性接口，内有导航器和路由
interface IProps {
  navigation: RootStackNavigation;
  route: Route;
  // route: RouteProp<BottomTabParamList, "Home">;
}

//获取title的方法
function getHeaderTitle(routeName: string) {
  // const routeName = route.state
  //   ? route.state.routes[route.state.index].name
  //   : route.params?.screen || 'HomeTabs';
  console.log('routeName:' + routeName);
  switch (routeName) {
    case 'HomeTabs':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '账户';
    default:
      return '首页';
  }
}

class BottomTabs extends React.Component<IProps> {
  componentDidMount() {
    this.setOption();
  }
  componentDidUpdate() {
    this.setOption();
  }
  setOption = () => {
    const {navigation, route} = this.props;
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'HomeTabs';

    if(routeName === 'HomeTabs') {
      navigation.setOptions({
        // headerTitle:getHeaderTitle(route),
        headerTitle: '',
        headerTransparent:true
      });
    } else {
      navigation.setOptions({
        // headerTitle:getHeaderTitle(route),
        headerTitle: getHeaderTitle(routeName),
        headerTransparent:false
      });
    }
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f86442',
        }}>
        <Tab.Screen
          name={'Test'}
          component={HomeTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-31shouyexuanzhong" size={size} color={color} />
            ),
          
          }}
        />
        <Tab.Screen
          name={'Listen'}
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-31shoucangxuanzhong" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={'Found'}
          component={Found}
          options={{
            tabBarLabel: '找到',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-yiguanzhu" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name={'Account'}
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <IconFont name="icon-mine2" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
