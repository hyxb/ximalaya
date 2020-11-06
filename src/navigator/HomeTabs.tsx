import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home';

const Tab = createMaterialTopTabNavigator();

class HomeTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy={true}
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
        <Tab.Screen
          name="home"
          component={Home}
          options={{tabBarLabel: '推荐'}}
        />
        {/* <Tab.Screen name="home1" component={Home} options={{ tabBarLabel:'推荐'}}/>
                <Tab.Screen name="home2" component={Home} options={{ tabBarLabel:'推荐'}}/>
                <Tab.Screen name="home3" component={Home} options={{ tabBarLabel:'推荐'}}/> */}
      </Tab.Navigator>
    );
  }
}

export default HomeTabs;
