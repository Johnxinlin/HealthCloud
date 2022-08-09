import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import TopBarComponent from '../components/TopBarComponent';

const UserInfoPage = (props) => {
  return (
    <View><Text>UserInfo</Text></View>
  );
};

const styles = StyleSheet.create({
    //容器样式
    container: {
        flex: 1,    //设置该容器在主轴所占用区域
    },
})

export default UserInfoPage;
