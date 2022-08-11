import React from "react";
import {View,Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useState } from "react";
import { pxToDp } from "../utils/stylesKits";
import SvgUri from "react-native-svg-uri";
import { Input } from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import THButton from '../components/THButton';
import {screenWidth, screenheigth} from '../utils/stylesKits';
import {connect, useDispatch, useSelector } from 'react-redux';
import * as UserInfoActions from '../actions/UserInfoActions';

function UserInfoPage(props) {
    // const [gender, setGender] = useState('');
    const gender = useSelector((state) => state.userInfo.gender);
    const [nickname, setNickName] = useState('');
    // const [birthday, setBirthday] = useState('');
    const birthDay = useSelector((state)=> state.userInfo.birthDay);
    const [email, setEmail] = useState('');

    const dateNow = new Date();
    const currentDate = `${dateNow.getFullYear()} + "-" + ${dateNow.getMonth()} + "-" + ${dateNow.getDate()}`;
    const dispatch = useDispatch();


    return ( 
        <View>
            
            <View style={styles.container}>
                {/**1.0 标题 开始 */}
                <Text style={styles.titleTxt}>完善个人信息界面</Text>
                <Text style={styles.titleTxt}>提升我的魅力</Text>
                {/**1.0 标题 结束 */}

                {/** 2.0 性别 开始 */}
                <View style={styles.inputContainer}>
                    <View style={{width:"60%", alignSelf: "center",justifyContent:"space-around", height:pxToDp(1,30), flexDirection:"row", alignItems:"center"}}>
                        <TouchableOpacity onPress={()=>{dispatch(UserInfoActions.genderSetState({gender:'男'})); console.log(gender);}}  
                        style={{...styles.sexButton, backgroundColor: gender==='男'?"#858585":"#eee",}}>
                            {/* <SvgUri source={require('../img/svg/male1.svg')} width="60" height="60"/> */}
                            <Image source={require('../img/男士.png')} style={{width:60, height:60}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{dispatch(UserInfoActions.genderSetState({gender:'女'}));}} 
                        style={{...styles.sexButton, backgroundColor: gender==='女'?"#858585":"#eee",}}>
                            {/* <SvgUri source={require('../img/svg/female2.svg')} width="60" height="60"/> */}
                            <Image source={require('../img/女士.png')} style={{width:60, height:60}}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:"60%", alignSelf: "center",justifyContent:"space-around", height:pxToDp(1,30), flexDirection:"row", alignItems:"center"}}>
                      <Text style={{...styles.titleTxt, color:'skyblue'}}>boy</Text>
                      <Text style={{...styles.titleTxt, color:'pink'}}>girl</Text>
                    </View>
                 </View>
                {/** 2.0 性别 结束 */}

                {/** 3.0 昵称 开始 */}
                <View >
                    <Input
                    value = {nickname}
                    placeholder="设置昵称"
                    onChangeText={(nickname) => setNickName(nickname)}
                    />
                </View>
                {/** 3.0 昵称 结束 */}

                {/** 4.0 日期 开始 */}
                <View>
                    <DatePicker
                        androidMode="spinner"
                        style={{width:pxToDp(0,320)}}
                        date={birthDay}
                        mode="date"
                        placeholder="设置生日"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate={currentDate}
                        confirmBtnText="确定"
                        cancelBtnText="取消"
                        customStyles={{
                        dateIcon: {
                            // position: 'absolute',
                            // left: 0,
                            // top: 4,
                            // marginLeft: 0
                            display:"none"
                        },
                        dateInput: {
                            marginLeft: pxToDp(0,10),
                            borderWidth:0,
                            borderBottomWidth:pxToDp(0,1.1),
                            alignItems:"flex-start",
                            paddingLeft:pxToDp(0,4)
                        },
                        placeholderText:{
                            fontSize:pxToDp(0,18),
                            color: "#afafaf"
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(val) => {dispatch(UserInfoActions.birthdaySetState({birthDay: val}))}}
                    />
                </View>
                {/** 4.0 日期 结束 */}

                {/** 5.0 邮箱 开始 */}
                <View style={{marginTop: pxToDp(0, 14)}}>
                  <Input 
                  placeholder="设置邮箱"
                  value={email}
                  onChangeText = {(value) => {setEmail(value)}}></Input>
                </View>
                {/** 5.0 邮箱 结束 */}

                {/* 6.0 进入主页按钮 开始 */}
                <View style={styles.inputContainer}>
                     <THButton 
                     style={styles.goHomeButton}
                     onPress={
                      ()=>{
                        console.log(props);
                        props.navigation.navigate('tabs');
                        }}>
                        <Text>   开始体验吧！！</Text>
                     </THButton>
                </View>
                {/* 6.0 进入主页按钮 结束 */}
            </View >
        </View>
        
     );
}

const styles = StyleSheet.create({
  container:{
    width:screenWidth,
    height:screenheigth,
    backgroundColor:"#fff",
    padding: pxToDp(0, 20)
  },
  inputContainer:{
    marginTop:pxToDp(1,20)
  },
  titleTxt:{
    fontSize:pxToDp(0,20),
    color: '#666',
    fontWeight: "bold"
    },
  sexButton:{
    borderRadius:pxToDp(0,30),
    width:pxToDp(0,60), 
    height:pxToDp(0,60), 
    
    alignItems: "center",
    justifyContent:"center", 
  },
  goHomeButton:{
    width:'100%',
    height: pxToDp(0, 80),
    justifyContent:'center',
    alignSelf:'center'
  }
})
export default UserInfoPage;
