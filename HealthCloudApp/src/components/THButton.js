import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @name 渐变色按钮组件 样式设置同touchableOpacity组件
 * @param {*} props 
 * @returns 
 */
function Index (props) {


    return ( 
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={{width: "100%", height: "100%", ...props.style, overflow:"hidden"}}>
            <LinearGradient start={{x:0, y:1}} end={{x:1, y:0}} colors={['#9b63cd', '#e07080']} style={styles.linearGradient}>
                <Text style={{...styles.buttonText, ...props.textStyle}}>
                    {props.children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
     );
}

// Later on in your styles..
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});




export default Index;