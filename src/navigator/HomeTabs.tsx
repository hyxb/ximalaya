import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabBar,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';
// import { IProps } from 'react-native-linear-animated-gradient-transition';

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HomeTabs extends React.Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

  renderScreen = (item: ICategory) => {
    //动态生成HOMEMODEL
    // console.log("MyCatager Item Id:",item.id);
    createHomeModel(item.id);

    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{tabBarLabel: item.name}}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };

  render() {
    const {myCategorys} = this.props;
    return (
      <Tab.Navigator
        lazy={true}
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBarOptions={{
          scrollEnabled: true, //滚动标签栏
          tabStyle: {
            width: 80,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 3,
            backgroundColor: '#f86442',
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333',
        }}>
{/* 
        <Tab.Screen
          name="home"
          component={Home}
          options={{tabBarLabel: '推荐'}}
          // initialParams={{
          //   namespace:'test',
          // }}
        /> */}
        {myCategorys.map(this.renderScreen)}

        {/* <Tab.Screen name="home1" component={Home} options={{ tabBarLabel:'推荐'}}/>
                <Tab.Screen name="home2" component={Home} options={{ tabBarLabel:'推荐'}}/>
                <Tab.Screen name="home3" component={Home} options={{ tabBarLabel:'推荐'}}/> */}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {backgroundColor: 'transparent'},
});

export default connector(HomeTabs);
