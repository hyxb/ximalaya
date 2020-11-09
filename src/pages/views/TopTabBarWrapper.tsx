import React from 'react';
import {View, Text} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
interface IProps extends MaterialTopTabBarProps {}

class TopTabBarWrapper extends React.Component<IProps> {
  render() {
    return (
      <View>
        <MaterialTopTabBar {...props} />
      </View>
    );
  }
}
