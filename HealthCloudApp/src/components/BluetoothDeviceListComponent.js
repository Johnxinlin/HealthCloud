import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import * as ScreenUtil from '../utils/ScreenUtil';

/**
 * @name 设备列表组件
 * @param devices Array 已配对/未配对列表
 * @param onDevicePress Function 列表点击回调函数
 * @returns {Node} 组件界面
 */
const BluetoothDeviceListComponent = ({ devices, onDevicePress,BTsection, onRubbishBinPress }) => (
  <ScrollView style={styles.container}>
    {/* 遍历传入的设备列表 */}
    {devices.map((device, i) => {
      // 检测device.name（设备命名）的开头是否为"SN"，如果字符串中含有匹配的文本，则显示设备列表，否则不显示
      return /^SN/.test(device.name) ? (
        <View key={device.id} style={styles.container_device}>
          <TouchableHighlight underlayColor="#DDDDDD" key={`${device.id}_${i}`} style={styles.container_image} onPress={() => {onDevicePress(device)}}>
            <Image
              source={require('./../img/box.png')}
              style={{
                width: ScreenUtil.scaleSize(100),
                height: ScreenUtil.scaleHeight(50),
              }}
            />
          </TouchableHighlight>
          <View style={styles.container_info}>
            <Text style={styles.txt_info}>机型参数信息</Text>
            <Text style={styles.txt_device}>{device.name}</Text>
            <Text>{`<${device.id}>`}</Text>
          </View>
          {BTsection ? null : (
            <View>
              <TouchableHighlight underlayColor="#DDDDDD" key={`${device.id}_${i}`} onPress={() => onRubbishBinPress(device)}>
                <Image
                  source={require('./../img/delete.png')}
                  style={{
                    width: ScreenUtil.scaleSize(25),
                    height: ScreenUtil.scaleHeight(25),
                  }}
                />
              </TouchableHighlight>
            </View>
          )}          
        </View>
      ) : null;
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_device: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    height: ScreenUtil.scaleHeight(120),
    marginTop: ScreenUtil.scaleHeight(10),
    marginHorizontal: ScreenUtil.scaleSize(20),
  },
  container_image: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    borderRadius: 10,
    elevation: 10,
    width: ScreenUtil.scaleSize(130),
    height: ScreenUtil.scaleHeight(100),
  },
  container_info: {
    marginRight: ScreenUtil.scaleSize(15),
  },
  txt_info: {
    fontSize: ScreenUtil.scaleSize(15),
    marginBottom: ScreenUtil.scaleHeight(5),
  },
  txt_device: {
    fontWeight: 'bold',
  },
});

export default BluetoothDeviceListComponent;
