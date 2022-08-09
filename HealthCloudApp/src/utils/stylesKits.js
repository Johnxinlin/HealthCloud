import { Dimensions } from "react-native";

// 设计稿的宽度 / 元素的宽度 = 手机屏幕 / 手机中元素的宽度
// 左边单位为像素  右边单位为dp
// 手机中元素的宽度 = 手机品目 * 元素的宽度 / 设计高的宽度
/**
 * 屏幕的宽度
 */
export const screenWidth = Dimensions.get("window").width;
/**
 * 屏幕的高度
 */
export const screenheigth = Dimensions.get("window").height;
/**
 * 像素转dp
 * @param {Boolean} type 0为宽度转换  1为高度转换 设计稿的宽高由设计者给出
 * @param {Number} elePx 需转换的元素
 * @returns 
 */

export const pxToDp = (type, elePx) => {
    if(!type){
        return screenWidth * elePx / 375;
    }else if(type){
        return screenheigth * elePx / 375;
    }
}