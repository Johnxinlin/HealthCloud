import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import THButton from '../components/THButton';
import {Input, Icon} from '@rneui/themed';
import {pxToDp} from '../utils/stylesKits';
import validator from '../utils/validator';
import Toast from 'teaset/components/Toast/Toast';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import newToast from '../utils/toast';

const RegisterContainer = (props) => {
  const [showFillVCode, setShowFillVCode] = useState(false);
  const [isCountDowning, setisCountDowning] = useState(false);
  const [btnTxt, setBtnTxt] = useState("重新获取");
  const [phone, setPhone] = useState(''); // 手机号
  const [newPassword, setNewPassword] = useState(''); // 密码
  const [phoneValid, setPhoneValid] = useState(true); // 手机格式
  const [newPasswordValid, setNewPasswordValid] = useState(true); // 手机格式
  const [vCodeTxt, setVCodeTxt] = useState('');

  const registerSubmit = async() => {
    // 判断号码及密码是否有正确输入，否则返回
    if(!(phoneValid & newPasswordValid)){
      Toast.message("电话或密码格式错误！");
      return;
    }
    

    // 显示输入验证码界面
    setShowFillVCode(true);

    // 请求验证码
    countDown();
  };

  const countDown = () =>{
    if(isCountDowning)
      return;
    setisCountDowning(true);

    let second = 5;
    setBtnTxt(`重新获取（${second}s）`);
    let timeId = setInterval(()=>{
      second--;
      setBtnTxt(`重新获取（${second}s）`);

      if(second === 0){
        clearInterval(timeId);
        setBtnTxt("重新获取");
        setisCountDowning(false);
      }
    }, 1000)
  }

  const phoneNumberChangeText = (phone) =>{
    setPhone(phone);
    console.log(phone);
  }

  const phoneSubmitEditing = async() =>{

    if(validator.validatePhone(phone)){
      setPhoneValid(true);
    }else{
      setPhoneValid(false);
      return;
    }

  }

  const newPasswordNumberChangeText = (newPassword) =>{
    setNewPassword(newPassword);
    
  }

  const newPasswordSubmitEditing = async() =>{
    if(validator.validatePassword(newPassword)){
      setNewPasswordValid(true);
    }else{
      setNewPasswordValid(false);
      return;
    }
  }

  const repGetVcode = async() => {
    // const res = await request.post(ACCOUNT_LOGIN,{phone:phoneNumber})
    countDown();
    setVCodeTxt("");
  }

  // 验证码输入框的值改变事件
  const onVcodeChangeText=(vCodeTxt) => {
    setVCodeTxt(vCodeTxt.toString());
    console.log(vCodeTxt);
  }

  // 验证码输入完毕事件
  const onVcodeSubmitEditing= async()=>{
    /**
     * 1.对验证码做校验长度
     * 2.将手机号码和验证码一起发送到后台
     * 3.发怒hi之 有 isNew
     * 4. 新用户 -》 完善个人信息的页面
     * 5.老用户 -》 交友 -首页
     */

    if (vCodeTxt.length != 6){
      Toast.message("验证码不正确", 2000, "center");
      return;
    }

    // const res = await request.post(ACCOUNT_VALIDATECODE,{
    //   phone:phoneNumber,
    //   vcode:vcodeTxt
    // });
    // console.log(res);

    if(true){       // res.data.isNew
      // 新用户
      props.navigation.navigate("userInfo");
    }else{
      // 老用户
      alert("老用户 跳转交友页面")
    }
  }

  return (
    <View>
      {/** 0.0 状态栏 开始 */}
      <StatusBar backgroundColor="transparent" translucent={true} />
      {/** 0.0 状态栏 结束 */}
      {/** 1.0 背景图片 开始 */}
      {/** 200 单位dp  单位px -> dp单位？ */}
      <Image
        source={require('../img/register.jpg')}
        style={{width: '100%', height: pxToDp(0, 250)}}
      />
      {/** 1.0 背景图片 结束 */}

      {/** 2.0 内容 开始 */}
      <View style={{padding: pxToDp(0, 20)}}>
        {/** 2.1 内容 开始 */}
        {!showFillVCode ? (
          <View
            style={{
              justifyContent: 'flex-start',
              alignContent: 'center',
              width: '100%',
              height: '70%',
            }}>
            <View style={styles.bar}>
              <Text style={styles.txt_title}>手机号</Text>
              {/* <TextInput style={styles.txtInput_txt} placeholder="请输入手机号" placeholderTextColor="#999999" maxLength={11} value={mobile} onChangeText={(mobile) => setMobile(mobile)} /> */}
              <Input
                placeholder="请输入手机号码"
                maxLength={11}
                keyboardType="phone-pad"
                value={phone}
                inputStyle={{color: '#333'}} //输入字体的央样式改变
                onChangeText = {(value) => phoneNumberChangeText(value)}
                errorMessage={phoneValid ? "" : "手机号格式不正确"}
                onSubmitEditing={phoneSubmitEditing}
                style={{width: '100%', marginTop: pxToDp(0, 15)}}
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
                value={newPassword}
                inputStyle={{color: '#333'}} //输入字体的央样式改变
                onChangeText = {(value) => newPasswordNumberChangeText(value)}
                errorMessage={newPasswordValid ? "" : "密码格式不正确"}
                onSubmitEditing={newPasswordSubmitEditing}
                style={{width: '100%', marginTop: pxToDp(0, 15)}}
              />
            </View>

            <View style={styles.bar}>
              <THButton
                onPress={() => {
                  registerSubmit();
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'skyblue',
                    fontSize: pxToDp(0, 25),
                  }}>
                  注 册
                </Text>
              </THButton>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text
                style={{
                  fontSize: pxToDp(0, 25),
                  color: '#888',
                  fontWeight: 'bold',
                }}>
                输入6位验证码
              </Text>
            </View>
            <View style={{marginTop: pxToDp(0, 15)}}>
              <Text style={{color: '#888'}}>已发到：+86{phone}</Text>
            </View>
            <View>
              <CodeField
                // ref={ref}
                // {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={vCodeTxt}
                onChangeText={onVcodeChangeText}
                cellCount={6}
                onSubmitEditing={onVcodeSubmitEditing}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            <View style={{marginTop: pxToDp(0, 15), alignSelf: 'center',width:"100%", marginLeft: pxToDp(0, 40)}}>
              <THButton
                disabled={isCountDowning}
                onPress={() => repGetVcode()}
                style={{
                  borderRadius: 20,
                  height: pxToDp(1, 20),
                  width: '85%',
                  alignItems: 'center',
                }}>
                <Text>{btnTxt}</Text>
              </THButton>
            </View>
          </View>
        )}
        {/** 2.1 内容 结束 */}
      </View>
      {/** 2.0 内容 结束 */}
    </View>
  );
};

const styles = StyleSheet.create({
  //容器样式
  container: {
    flex: 1, //设置该容器在主轴所占用区域
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd', // #F7F8FC
    borderRadius: 10,
    borderColor: '#666',
    borderWidth: 2,
    width: 300,
    height: 80,
    marginLeft: 10,
    marginTop: 25,
    overflow: 'hidden',
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color:"black"
  },
  focusCell: {
    borderColor: '#7d53ea',
    color:'#7d53ea'
  },
});

export default RegisterContainer;
