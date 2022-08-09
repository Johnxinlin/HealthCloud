import React from 'react';
import {} from 'react-native';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Tab1Container from './containers/tabBar/Tab1Container';
import Tab2Container from './containers/tabBar/Tab2Container';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="tab2"
       //设置初始需渲染的路由名
      activeColor="#3A86F8" //设置激活颜色
      inactiveColor="#B4B4B4" //设置未激活颜色
      barStyle={{ backgroundColor: '#FFFFFF', height: 60 }} //设置功能条样式
    >
      <Tab.Screen
        name="tab1"
        component={Tab1Container}
        options={{
          tabBarLabel: 'Tab1',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./img/Tab1_1.png') : require('./img/Tab1_0.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="tab2"
        component={Tab2Container}
        options={{
          tabBarLabel: 'Tab2',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./img/Tab2_1.png') : require('./img/Tab2_0.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
