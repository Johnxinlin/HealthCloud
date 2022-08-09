import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab2Container = (props) => {
  return (
    <View style={styles.container}>
      {/**显示当前页面文本的名称 */}
      <Text style={styles.txt}>Tab1</Text>
      {/**跳转到对应字页面的按钮 */}
      <Button
        title={'to userInfo'}
        onPress={() => {
          //点击按钮后，跳转到Page2页面
          props.navigation.navigate('userInfo');
        }}
      />
      <TouchableOpacity
        style={styles.btn_logout}
        onPress={() => {
          props.navigation.navigate('login');
        }}
      >
        <Text style={styles.txt_logout}>退出登陆</Text>
      </TouchableOpacity>
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
  //登出按钮样式
  btn_logout: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      width: 150,
      height: 40,
      borderRadius: 2,
      marginTop: 20,
  },
  txt_logout: {
      color: '#FFFFFF'
  }
});

export default Tab2Container;
