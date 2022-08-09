import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * @name 登陆页面组件
 */
const WelcomeComponent = () => {
  return (
    <View style={{alignSelf:'center', backgroundColor:'#fff', borderRadius: 10, margin:10, borderColor:'yellow',borderWidth:2}}>
      <Text style={styles.txt_top}>健康云登陆界面</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt_top: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#666',
    margin: 10,
  },
});

export default WelcomeComponent;
