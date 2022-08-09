import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import BluetoothConnectComponent from '../../components/BluetoothConnectComponent';



const Tab1Container = (props) => {

  // navigation = useNavigation() 

  return (
    <View >
      {/**跳转到对应字页面的按钮 */}
      {/*<Button
        title={'to Page1'}
        onPress={() => {
          //点击按钮后，跳转到Page1页面
          props.navigation.navigate('page1');
        }}
      />*/}
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

export default Tab1Container;
