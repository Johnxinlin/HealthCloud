import React from 'react';
import {StyleSheet, View, Text, Button, ImageBackground,Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { pxToDp, screenheigth, screenWidth } from '../../utils/stylesKits';
import SvgUri from "react-native-svg-uri";

const HomeContainer = (props) => {
  return (
    <ImageBackground  source={require('../../img/blackBg2.jpg')} style={{width:screenWidth, height:screenheigth, ...styles.container}}>
      {/* 体温呼吸测量栏 开始 */}
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#f43f3b', '#ec008c']} style={styles.measureBlock}>
        <View style={styles.svgBox}>
            <TouchableOpacity onPress={()=>{}}  
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/breath.svg')} width="70" height="70"/> */}
                <Image source={require('../../img/healthPic/呼吸.png')} style={{width:80, height:80}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} 
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/temp2.svg')} width="50" height="50"/> */}
                <Image source={require('../../img/healthPic/温度,测温,体温计.png')} style={{width:60, height:60}}></Image>
            </TouchableOpacity>
            {/* <SvgUri source={require('../../img/svg/Home_unfoucs.svg')} width="60" height="60"/> */}
          </View>
          <View style={styles.svgBox}>
            <Text style={styles.txt}>呼吸</Text>
            <Text style={styles.txt}>体温</Text>
          </View>
      </LinearGradient>
      {/* 体温呼吸测量栏 结束 */}

      {/* 血氧血压测量栏 开始 */}
      
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={[ "#9000ff", "#1cbbb4"]} style={styles.measureBlock}>
        <View style={styles.svgBox}>
            <TouchableOpacity onPress={()=>{}}  
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/spo2.svg')} width="70" height="70"/> */}
                <Image source={require('../../img/healthPic/血氧.png')} style={{width:70, height:70}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} 
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/pres3.svg')} width="50" height="50"/> */}
                <Image source={require('../../img/healthPic/血压.png')} style={{width:70, height:70}}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.svgBox}>
            <Text style={styles.txt}>血氧</Text>
            <Text style={styles.txt}>血压</Text>
          </View>
      </LinearGradient>
      
      {/* 血氧血压测量栏 结束 */}

      {/* 心电测量及退出栏 开始 */}
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0081ff', '#6739b6']} style={styles.measureBlock}>
      <View style={styles.svgBox}>
            <TouchableOpacity onPress={()=>{}}  
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/ecg.svg')} width="70" height="70"/> */}
                <Image source={require('../../img/healthPic/心电图.png')} style={{width:60, height:55}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('login')}} 
            style={styles.buttonStyle}>
                {/* <SvgUri source={require('../../img/svg/out.svg')} width="50" height="50"/> */}
                <Image source={require('../../img/healthPic/退出.png')} style={{width:60, height:60}}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.svgBox}>
            <Text style={styles.txt}>心电</Text>
            <Text style={styles.txt}>退出</Text>
          </View>
      </LinearGradient>
      {/* 心电测量及退出栏 结束 */}
    </ImageBackground>

    
  );
};

const styles = StyleSheet.create({
  //容器样式
  container: {
    // flex: 1,
    alignSelf: 'center',
    justifyContent: 'center', //子元素沿主轴排列位置
    flex:1
    // width: 350,
  },
  //文本样式
  txt: {
    // alignSelf: 'center', //对齐方式
    marginBottom: pxToDp(0,70),
    fontSize:pxToDp(0,20),
    fontWeight: 'bold'
  },
  measureBlock: {
    width: '90%', 
    height: '24%', 
    borderRadius: 20,
    // backgroundColor: "red",
    marginTop: 30,
    overflow:"hidden",
    marginLeft: pxToDp(0,18)
  },
  svgBox:{
    width:"80%", 
    alignSelf: "center",
    justifyContent:"space-around", 
    height:pxToDp(1,30), 
    flexDirection:"row", 
    alignItems:"center", 
    marginTop:pxToDp(0,30)
  },
  buttonStyle:{
    borderRadius:pxToDp(0,30),
    width:pxToDp(0,60), 
    height:pxToDp(0,60), 
    alignItems: "center",
    justifyContent:"center",
   }

});

export default HomeContainer;
