import React from 'react';
import {Modal, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  StackActions,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import Detils from '@/pages/Detail';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category/index';
import Album from '@/pages/Album';
import _ from 'lodash';
import Animated from 'react-native-reanimated';
import IconFont from '../iconfont';

export type RootStackParamList = {
  BottomTabs: {screen?: string};
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
  };
  Detils: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

let Stack = createStackNavigator<RootStackParamList>();

function getAlbumnOptions({
  route,
}: {
  route: RouteProp<RootStackParamList, 'Album'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: 0,
    },
    headerBackground: () => {
      return <Animated.View style={styles.headerBackground} />;
    },
  };
}

function renderStack() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        headerTitleAlign: 'center',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        ...Platform.select({
          android: {
            headerStatusBarHeight: StatusBar.currentHeight,
          },
        }),
      }}>
      <Stack.Screen
        options={{
          title: '首页',
          headerTitleAlign: 'center',
          headerTitle: '首页',
        }}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        options={{
          title: '分类',
          headerTitleAlign: 'center',
          headerTitle: '分类',
        }}
        name="Category"
        component={Category}
      />
      <Stack.Screen name="Album" component={Album} options={getAlbumnOptions} />
    </Stack.Navigator>
  );
}

export type ModelStackParamList = {
  Root: undefined;
  Detils: {
    id:string;
  };
};

const ModalStack = createStackNavigator<ModelStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModelStackParamList>;

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
        headerBackTitleVisible: false,
      }}>
      <ModalStack.Screen
        name="Root"
        component={renderStack}
        options={{headerShown: false}}
      />
      <ModalStack.Screen
        name="Detils"
        component={Detils}
        options={{
          // title:'ceshi',
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {backgroundColor: '#807c66'},
          headerBackImage: ({tintColor}) => (
            <IconFont
              name={'icon-arrow-down-bold'}
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
    </ModalStack.Navigator>
  );
}

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <ModalStackScreen />
        {/* {renderStack} */}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    backgroundColor: '#fff',
    flex: 1,
    opacity: 0,
  },
  headerBackImage: {
    marginVertical: 5,
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});
export default Navigator;
