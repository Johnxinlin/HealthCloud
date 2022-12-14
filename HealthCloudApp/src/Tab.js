import React from 'react';
import {} from 'react-native';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BluetoothContainer from './containers/tabBar/BluetoothContainer';
import HomeContainer from './containers/tabBar/HomeContainer';
import PersonalCenterContainer from './containers/tabBar/PersonalCenterContainer';
import SvgUri from "react-native-svg-uri";

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
       //设置初始需渲染的路由名
      activeColor="#3A86F8" //设置激活颜色
      inactiveColor="#123456" //设置未激活颜色 #B4B4B4
      barStyle={{ backgroundColor: '#111', height: 60 }} //设置功能条样式
    >
      <Tab.Screen
        name="center"
        component={PersonalCenterContainer}
        options={{
          tabBarLabel: '个人中心',
          tabBarIcon: ({ focused }) => (
            // <SvgUri source={focused ? require('./img/healthPic/personnalCenter_focus.svg') : require('./img/healthPic/personalCenter_unfocus.svg')} width="25" height="25" />
            <Image source={focused ? require('./img/healthPic/personalCenter_focus.png') : require('./img/healthPic/personalCenter_unfocus.png')} style={{width:25, height:25}}></Image>
          ),
        }}
      />
      
      <Tab.Screen
        name="home"
        component={HomeContainer}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            // <Image
            //   source={focused ? require('./img/Tab2_1.png') : require('./img/Tab2_0.png')}
            //   style={{
            //     width: 25,
            //     height: 25,
            //   }}
            // />
            // <SvgUri source={focused ? require('./img/healthPic/Home_focus.svg') : require('./img/healthPic/Home_unfoucs.svg')} width="25" height="25" />
            <Image source={focused ? require('./img/healthPic/Home_focus.png') : require('./img/healthPic/Home_unfocus.png')} style={{width:25, height:25}}></Image>
          ),
        }}
      />

      <Tab.Screen
        name="bluetoothSet"
        component={BluetoothContainer}
        options={{
          tabBarLabel: '蓝牙设备连接',
          tabBarIcon: ({ focused }) => (
            // <SvgUri source={focused ? require('./img/healthPic/蓝牙_focus.svg') : require('./img/healthPic/bluetooth_unfocus.svg')} width="25" height="25" />
            <Image source={focused ? require('./img/healthPic/bluetooth_focus.png') : require('./img/healthPic/bluetooth_unfocus.png')} style={{width:25, height:25}}></Image>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
