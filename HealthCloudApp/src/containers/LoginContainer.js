import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, Image, ImageBackground } from 'react-native';
import WelcomeComponent from '../components/WelcomeComponent';
import THButton from '../components/THButton';
import {Input, Icon} from '@rneui/themed';
import { pxToDp } from '../utils/stylesKits';
import validator from '../utils/validator';
import Toast from 'teaset/components/Toast/Toast';
import { screenheigth, screenWidth } from '../utils/stylesKits';

/**
 * @name 登陆页面组件
 */
const LoginContainer = (props) => {
  const [mobile, setMobile] = useState(''); // 手机号
  const [password, setPassword] = useState(''); // 密码
  const [moblieValid, setMobileValid] = useState(true); // 手机格式
  const [passwordValid, setPasswordValid] = useState(true); // 手机格式


  /**
   * @name 登录按键回调函数
   */
  const login = () => {
    ToastAndroid.showWithGravity('登录成功', 500, ToastAndroid.CENTER);
    props.navigation.navigate('tabs');
    setMobile('');
    setPassword('');
  };

  /**
   * @method 电话号码状态改变函数
   * @param {*} mobile 
   */
  const mobileNumberChangeText = (mobile) =>{
    setMobile(mobile);
    console.log(mobile);
  }

  const moblieSubmitEditing = async() =>{

    if(validator.validatePhone(mobile)){
      setMobileValid(true);
    }else{
      setMobileValid(false);
      return;
    }

  }

  const passwordNumberChangeText = (password) =>{
    setPassword(password);
    
  }

  const passwordSubmitEditing = () =>{
    if(validator.validatePassword(password)){
      setPasswordValid(true);
    }else{
      setPasswordValid(false);
      return;
    }
  }

  const jumpToRegister = () => {
    props.navigation.navigate('register');
  }

  return (
    <View >
      {/* 文本组件 */}
      <ImageBackground source={require('../img/blueBg2.jpg')} 
      style={{width: screenWidth, height: screenheigth}}>
        <View style={{justifyContent:'center', alignContent:'center', width:'100%', height:'100%'}}>
          <WelcomeComponent/>
          <View style={styles.bar}>
            <Text style={styles.txt_title}>账号</Text>
            {/* <TextInput style={styles.txtInput_txt} placeholder="请输入手机号" placeholderTextColor="#999999" maxLength={11} value={mobile} onChangeText={(mobile) => setMobile(mobile)} /> */}
            <Input
                placeholder="请输入手机号码"
                maxLength={11}
                keyboardType="phone-pad"
                value={mobile}
                inputStyle={{color: "#333"}}   //输入字体的央样式改变
                onChangeText = {(value) => mobileNumberChangeText(value)}
                errorMessage={moblieValid ? "" : "手机号格式不正确"}
                onSubmitEditing={moblieSubmitEditing}
                style={{width:"100%", marginTop:pxToDp(0,15)}}
            />
          </View>

          {/* 密码输入组件 */}
          <View style={styles.bar}>
            <Text style={styles.txt_title}>密 码</Text>
            {/* <TextInput style={styles.txtInput_txt} placeholder="请输入密码" placeholderTextColor="#999999" value={password} onChangeText={(password) => setPassword(password)} /> */}
            <Input
                placeholder="请输入密码"
                maxLength={16}
                keyboardType="phone-pad"
                value={password}
                inputStyle={{color: "#333"}}   //输入字体的央样式改变
                onChangeText = {(value) => passwordNumberChangeText(value)}
                errorMessage={passwordValid ? "" : "手机号格式不正确"}
                onSubmitEditing={passwordSubmitEditing}
                style={{width:"100%", marginTop:pxToDp(0,15)}}
            />
          </View>

          {/* 登录按钮 */}
          <View style={styles.box_login}>
            <TouchableOpacity
              style={{...styles.btn_login, width:"80%", height:50}}
              onPress={() => {
                if ((moblieValid & passwordValid) && mobile != '') {
                  login();
                }else{
                  Toast.message("请检查用户名及密码是否正确");
                }
              }}
            >
              <Text style={styles.txt_login}>登 录</Text>
            </TouchableOpacity>
            {/* 注册按钮 开始 */}
            <View style={{...styles.box_login, width:"80%", height:50}}><THButton onPress={()=> jumpToRegister()}><Text>注  册</Text></THButton></View>
            {/* 注册按钮 结束 */}            
          </View>


        </View>

      </ImageBackground>
      {/* 手机号输入组件 */}

      


    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FC',
    borderRadius: 10,
    width: 300,
    height: 80,
    marginLeft: 25,
    marginTop: 25,
    overflow:"hidden"
  
  },
  txt_title: {
    color: '#333333',
    marginLeft: 20,
  },
  txtInput_txt: {
    backgroundColor: '#F7F8FC',
    borderColor: '#FFFFFF',
    width: 200,
    marginLeft: 20,
  },
  box_login: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_login: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 5
  },
  btn_login: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C86F7',
    borderRadius: 10,
    width: 247,
    height: 46,
    margin: 30,
  },
});

export default LoginContainer;
