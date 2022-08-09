import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const TopBarComponent = (props) => {
  return (
    <View style={styles.container_bar}>
      
      <TouchableOpacity
        style={styles.btn_back}
        onPress={() => {
          //导航：返回上一个页面组件
          props.navigation.goBack(); //返回上页
        }}>
        <Image
          source={require('../img/backleft.png')}
          style={styles.img_back}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //容器功能条样式
  container_bar: {
    alignItems: 'center',
    justifyContent: 'center', //主轴内子元素的排列位置
    flexDirection: 'row', //主轴打横还是打竖
    backgroundColor: '#2c65f7',
    height: 50,
  },
  //返回按钮功能条
  btn_back: {
    position: 'absolute', //设置绝对定位
    left: 10,
  },
  //返回图片样式
  img_back: {
    width: 30,
    height: 21,
  },
  //标题样式
  title: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default TopBarComponent;
