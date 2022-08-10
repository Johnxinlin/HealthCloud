import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterContainer from './containers/RegisterContainer';
import LoginContainer from './containers/LoginContainer';
import Tabs from './Tab';
import UserInfoPage from './containers/UserInfoPage';


const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='userInfo'
        //headerShown指定导航条阴影的显示或隐藏  presentatino指定页面模式
        screenOptions={{headerShown: false, presentation: 'card'}}
      >
        <Stack.Screen name='login' component={LoginContainer}/>
        <Stack.Screen name='tabs' component={Tabs}/>
        <Stack.Screen name='register' component={RegisterContainer}/>
        <Stack.Screen name='userInfo' component={UserInfoPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
