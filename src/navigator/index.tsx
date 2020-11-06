import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import Home from '@/pages/Home';
import Detils from '@/pages/Detils';
import BottomTabs from './BottomTabs';

export type RootStackParamList = {
  BottomTabs: {screen?:string};
  Detils: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true} >
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            headerTitleAlign: 'center',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            // headerStatusBarHeight: StatusBar.currentHeight,
            // headerStyle:{
              // backgroundColor:'red',
              // ...Platform.select({
                // android:{
                //   elevation:0,
                //   borderBottomWidth: StyleSheet.hairlineWidth,
                // }
              // })
            // }
          }}>
          <Stack.Screen
            options={{title: '首页', headerTitleAlign: 'center',headerTitle:"首页"}}
            name="BottomTabs"
            component={BottomTabs}
          />
          <Stack.Screen name="Detils" component={Detils} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
