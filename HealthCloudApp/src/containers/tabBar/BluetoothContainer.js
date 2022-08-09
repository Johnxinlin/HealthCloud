import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import BluetoothConnectComponent from '../../components/BluetoothConnectComponent';



const BluetoothContainer = (props) => {

  // navigation = useNavigation() 

  return (
    <View >
      <ScrollView>
        <BluetoothConnectComponent />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  //容器样式
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center', //子元素沿主轴排列位置
    width: 150,
  },
  //文本样式
  txt: {
    alignSelf: 'center', //对齐方式
    marginBottom: 50,
  },
});

export default BluetoothContainer;
