import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View, ActivityIndicator, ToastAndroid, Modal, Image } from 'react-native';
// import { useNavigation, CommonActions } from '@react-navigation/native';
import { connect, useDispatch, useSelector } from 'react-redux';
import BluetoothSerial from 'react-native-bluetooth-serial';
import * as BluetoothActions from '../actions/BluetoothActions';
import BluetoothDeviceListComponent from './BluetoothDeviceListComponent';
// import LoadingUtil from '../utils/LoadingUtil';
// import showTips from '../utils/showTips';
import * as ScreenUtil from '../utils/ScreenUtil';
import { requestLocationPermission } from '../utils/permission';



/**
 * @name 设备连接组件页码子组件
 * @returns {Node} 组件界面
 */
const BluetoothConnectComponent = () => {
  // 初始化组件的状态变量
  // const [BTisEnabled, setBTisEnabled] = useState(true); // 蓝牙状态，初始化为true
  const BTisEnabled = useSelector((state) => state.bluetooth.enabled);
  const [BTdiscovering, setBTdiscovering] = useState(false); // 搜索状态
  const [BTisConnected, setBTisConnected] = useState(false); //蓝牙连接状态
  const BTconnectedDevice = useSelector((state) => state.bluetooth.device); //应用的全局状态：当前连接的蓝牙设备
  const [BTsection, setBTsection] = useState(0); // 页码 0-常用设备页 1-新设备页
  const [BTdevices, setBTdevices] = useState([]); //已配对的蓝牙设备列表
  const [BTunpairedDevices, setBTunpairedDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

    // effect:页面初次渲染触发
  useEffect(() => {
    // Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    Promise.all([
      BluetoothSerial.isEnabled(), // 报告蓝牙是否启用  返回一个promise
      BluetoothSerial.list(), // 列出已配对设备  返回一个promise
    ]).then((values) => {
      //values为 promise的返回结果
      const [isEnabled, devices] = values;
      // 过滤开头为SN的已配对蓝牙设备
      const pairedDevices = devices.filter((paired) => {
        return /^SN/.test(paired.name);
      });
      // 更新组件状态： 更新常用设备列表
      setBTdevices(pairedDevices);
      // 更新全局状态： 蓝牙已开启
      dispatch(BluetoothActions.bluetoothConnectState({ enabled: isEnabled }));
    });

    // 蓝牙监听（蓝牙特定事件）事件字符串为固定字符，由第三方库BluetoothSerial开发者定义
    // 监听'bluetoothEnabled'-手机蓝牙已开启事件
    BluetoothSerial.on('bluetoothEnabled', () => {
      console.log('Bluetooth enabled');
      Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then((values) => {
        const [isEnabled, devices] = values;
        // 过滤开头为SN的已配对蓝牙设备
        const pairedDevices = devices.filter((paired) => {
          return /^SN/.test(paired.name);
        });
        // 更新组件状态： 更新常用设备列表
        setBTdevices(pairedDevices);
        // 更新全局状态： 蓝牙已开启
        dispatch(BluetoothActions.bluetoothConnectState({ enabled: isEnabled }));
      });
    });

    // 监听'bluetoothDisabled'-手机蓝牙已关闭事件
    BluetoothSerial.on('bluetoothDisabled', () => {
      console.log('Bluetooth disabled');
      // 更新组件状态: 清空常用设备列表
      setBTdevices([]);
      // 更新全局状态： 蓝牙已关闭
      dispatch(BluetoothActions.bluetoothConnectState({ enabled: false }));
    });

    // 监听'error'-错误事件
    BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`));

    // 监听'connectionLost'-连接丢失事件
    BluetoothSerial.on('connectionLost', () => {
      if (BTdevices) {
        console.log(`Connection to device ${BTdevices.name} has been lost`);
      }
    });

    // 组件销毁时，若蓝牙模块出于正在搜索设备状态，则取消蓝牙搜索并将BTdiscovering标志变量置为false
    return () => {
      if (BTdiscovering) {
        BluetoothSerial.cancelDiscovery()
          .then(() => {
            // 更新组件状态： 取消蓝牙搜索
            setBTdiscovering(false);
          })
          .catch((err) => console.log(err.message));
      }
    };
  }, []);

  /**
   * @method 打开-关闭蓝牙开关
   * @param {*} value true- 打开 false- 关闭
   */
  const toggleBluetooth = (value) => {
    if(value === true){
      requestEnable();
    }else{
      requestDisable();
    }
  }

  /**
   * @method 请求用户开启蓝牙
   */
  const requestEnable = () => {
    BluetoothSerial.enable()
    .then(() => {
      dispatch(BluetoothActions.bluetoothConnectState({enabled:true}))
    })
    .catch((err) => {
      dispatch(BluetoothActions.bluetoothConnectState({enabled:false}))
      console.log(err.message);
    })
  }

  /**
   * @method 请求用户关闭蓝牙
   */
  const requestDisable = () => {
    BluetoothSerial.disable()
    .then(() => {
      dispatch(BluetoothActions.bluetoothConnectState({enabled:false}))
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  /**
   * @method 发现未配对的蓝牙设备
   */
  const discoverUnpaireDevices = () => {
    // 判断蓝牙是否开启
    if (BTisEnabled) {
      // 位置权限申请
      requestLocationPermission();
      // 判断是否正在搜索蓝牙设备
      if (BTdiscovering) {
        // 若正在搜索蓝牙设备，点击按键则取消搜索，更新搜索状态
        setBTdiscovering(false);
      } else {
        // 未在搜索蓝牙设备，点击按键则开始搜索，更新搜索状态
        setBTdiscovering(true);
        // 获取搜索到的蓝牙设备
        BluetoothSerial.discoverUnpairedDevices()
          .then((res) => {
            // 过滤出未配对的人体生理参数监测系统
            let unpairedDevices = res.filter((unpaired) => {
              if (!BTdevices.some((paired) => unpaired.name === paired.name)) {
                return /^SN/.test(unpaired.name);
              }
            });
            // 对搜索到的未配对的设备进行去重，保证新设备列表中不会重复出现同一设备
            let map = new Map();
            for (let item of unpairedDevices) {
              if (!map.has(item.name)) {
                map.set(item.name, item);
              }
            }
            unpairedDevices = [...map.values()];
            console.log('搜索到的蓝牙设备', res);
            console.log('去重后的未配对的人体生理参数监测系统', unpairedDevices);

            // 判断是否搜索到未配对的设备，将搜索结果显示在“新设备”列
            if (JSON.stringify(unpairedDevices) === '[]') {
              ToastAndroid.showWithGravity('      未找到新蓝牙设备\n' + '请检查新设备蓝牙是否打开\n' + '或切换至常用设备列表查找', 100, ToastAndroid.CENTER);
              setBTunpairedDevices(unpairedDevices);
              setBTdiscovering(false);
            } else {
              setBTunpairedDevices(unpairedDevices);
              setBTdiscovering(false);
            }
          })
          .catch((err) => {
            setBTdiscovering(false);
            console.log(err.message);
          });
      }
    } else {
      ToastAndroid.showWithGravity('请打开蓝牙', 100, ToastAndroid.CENTER);
    }
  };

  /**
   * @method 停止搜索蓝牙设备
   */
  const cancelDiscovery = () => {
    if (BTdiscovering) {
      BluetoothSerial.cancelDiscovery()
        .then(() => {
          setBTdiscovering(false);
        })
        .catch((err) => console.log(err.message));
    }
  };

    /**
   * @method 点击设备图标
   */
  const onDevicePress = (device) => {
    if (BTsection === 0) {
      // 在常用设备列表中点击设备图标，则连接蓝牙设备
      connect(device);
    } else {
      // 在新设备列表中点击设备图标，则配对蓝牙设备
      pairDevice(device);
    }
  };

  /**
   * @method 点击垃圾桶图标，解除已配对的蓝牙设备
   */
   const onRubbishBinPress = (device) => {
    // 常用设备列表中点击垃圾桶图标，可取消配对设备，从常用列表设备中移除
    BluetoothSerial.unpairDevice(device.id)
      .then((unpaired) => {
        if (unpaired) {
          console.log(`Device ${device.name} unpaired successfully`);
          // 将常用设备列表中删去
          setBTdevices(BTdevices.filter((paired_device) => paired_device.id !== device.id));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };  

  /**
   * @method 连接蓝牙设备
   * @param {*} device 
   */
  const connect = (device) =>{
    setModalVisible(true);
    BluetoothSerial.connect(device.id)
      .then(() => {
        console.log(`Connected to device ${device.name}`);
        // 更新组件状态：关闭加载
        setModalVisible(false);
        // 更新组件状态：蓝牙已连接
        setBTisConnected(true);
        // 更新全局状态：当前连接的蓝牙设备
        dispatch(
          BluetoothActions.bluetoothDevice({ device }));
        dispatch(
          BluetoothActions.bluetoothRead(
            {},
            ()=>{},
            ()=>{}
          )
        )
      })
      .catch((err) => {
        setModalVisible(false);
        ToastAndroid.showWithGravity('无法连接设备\n' + '请确保蓝牙已开启', 100, ToastAndroid.CENTER);
        console.log(err.message);
      });
  }
  
  /**
   * @method 配对蓝牙设备
   */
  const pairDevice = (device) => {
    BluetoothSerial.pairDevice(device.id)
      .then((paired) => {
        if (paired) {
          console.log(`Device ${device.name} paired successfully`);
          // 将原先已配对的设备存入devices中
          const devices = BTdevices;
          // 将新配对的设备加入devices中
          devices.push(device);
          // 更新已配对设备列表
          setBTdevices(devices);
          // 将刚完成配对的设备从新配对设备列表中删去
          setBTunpairedDevices(BTunpairedDevices.filter((unpaired_device) => unpaired_device.id !== device.id));
        } else {
          console.log(`Device ${device.name} pairing failed`);
        }
      })
      .catch((err) => console.log(err.message));
  };

  /**
   * @method 断开设备连接
   */
   const disconnectDevice = () => {
    BluetoothSerial.disconnect()
      .then(() => {
        dispatch(BluetoothActions.bluetoothDevice({}));
        setBTisConnected(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };  

  return (
    <View style={styles.container}>
      {BTisConnected ? (
        // {/* 已连接蓝牙设备时，呈现UI: */} 
        <View>
          {/* 蓝牙设备型号 卡片组件 */}
          <View style={styles.container_paired}>
            <Image
              source={require('../img/box.png')}
              style={{
                width: ScreenUtil.scaleSize(110),
                height: ScreenUtil.scaleHeight(50),
              }}
            />
            <View>
              <Text style={styles.txt_devices}>设 备：{BTconnectedDevice.id}</Text>
              <Text style={styles.txt_devices}>型 号：{BTconnectedDevice.name}</Text>
            </View>
          </View>

          {/* 解除绑定 按钮 */}
          <TouchableOpacity
            style={styles.btn_unconnect}
            onPress={() => {
              // 断开连接
              disconnectDevice();
            }}
          >
            <Text style={styles.txt_btn}>解 除 绑 定</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 未连接蓝牙设备时，呈现UI:
      <View>
        {/* 显示加载界面 开始*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container_center}>
            <View style={styles.container_modal}>
              <ActivityIndicator animating={true} color="#ffffff" size={30} />
              <Text style={styles.txt_modal}>请稍后</Text>
            </View>
          </View>
        </Modal>
        
        {/* 显示加载界面 结束 */}
        {/* 蓝牙开关栏 */}
        <View style={styles.container_top}>
          {
            // 先判断蓝牙是否打开
            BTisEnabled ? (
              // 再判断是否正在搜索蓝牙设备
              BTdiscovering ? (
                // 蓝牙打开且正在搜索蓝牙设备时，呈现UI:
                <View style={styles.container_discover}>
                    {/* 圆形加载组件 */}
                  <ActivityIndicator style={styles.activityIndicator} animating={true} color="#A9A9A9" size={30} />
                  <Text style={styles.txt_heading}>搜索设备中</Text>
                </View>
              ) : (
                // 蓝牙打开且未在搜素蓝牙设备时，呈现UI:
                <Text style={styles.txt_heading}>手机蓝牙已打开…</Text>
              )
            ) : (
              // 蓝牙未打开时，呈现UI:
              <Text style={styles.txt_heading}>请确保手机蓝牙已打开…</Text>
            )
          }

          {/* 蓝牙开关 */}
          <View style={styles.container_enableBT}>
            <Text style={styles.txt_enableBT}>{BTisEnabled ? '关闭蓝牙' : '打开蓝牙'}</Text>
            <Switch
              onValueChange={(value) => {
                toggleBluetooth(value);
              }}
              value={BTisEnabled}
              thumbColor={'#2C65F7'}
              trackColor={{ false: '#eeeeee', true: '#87CEFA' }}
            />
          </View>
        </View>

        {/* 设备列表切换栏 */}
        <View style={styles.container_tab}>
          <TouchableOpacity style={[styles.tab, BTsection === 0 && styles.tab_active]} onPress={() => setBTsection(0)}>
            <Text style={styles.txt_tab}>常用设备</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, BTsection === 1 && styles.tab_active]} onPress={() => setBTsection(1)}>
            <Text style={styles.txt_tab}>新设备</Text>
          </TouchableOpacity>
        </View>

        {/* 蓝牙设备列表 */}
        <BluetoothDeviceListComponent 
        devices={BTsection === 0 ? BTdevices : BTunpairedDevices} 
        onDevicePress={(device)=>onDevicePress(device)} 
        BTsection={BTsection}
        onRubbishBinPress={onRubbishBinPress}/>
        <ScrollView style={styles.container_devicelist}>
          {BTsection === 1 ? (
            BTdiscovering ? (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  cancelDiscovery()
                }}
              >
                <Text style={styles.txt_btn}>{'停止搜索蓝牙设备'}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  discoverUnpaireDevices();
                }}
              >
                <Text style={styles.txt_btn}>{'开始搜索蓝牙设备'}</Text>
              </TouchableOpacity>
            )
          ) : null}
        </ScrollView>
      </View>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
  },
  container_paired: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 6,
    borderRadius: 20,
    marginTop: ScreenUtil.scaleHeight(230),
    paddingHorizontal: ScreenUtil.scaleSize(20),
    paddingVertical: ScreenUtil.scaleHeight(50),
    marginHorizontal: ScreenUtil.scaleSize(25),
  },
  container_center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_modal: {
    alignItems: 'center',
    backgroundColor: '#696969',
    borderRadius: 20,
    paddingHorizontal: ScreenUtil.scaleSize(30),
    paddingVertical: ScreenUtil.scaleHeight(20),
  },
  container_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    elevation: 6,
    height: ScreenUtil.scaleHeight(56),
    paddingHorizontal: ScreenUtil.scaleSize(16),
  },
  container_discover: {
    flexDirection: 'row',
  },
  container_tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 7,
    // height: ScreenUtil.scaleHeight(56),
    // paddingHorizontal: ScreenUtil.scaleSize(0),
  },
  container_devicelist: {
    alignSelf: 'center',
  },
  container_enableBT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt_devices: {
    fontSize: ScreenUtil.setSpText(12),
  },
  txt_modal: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: ScreenUtil.scaleHeight(5),
  },
  txt_heading: {
    alignSelf: 'center',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: ScreenUtil.setSpText(16),
  },
  txt_enableBT: {
    color: '#000000',
    fontSize: ScreenUtil.setSpText(14),
  },
  txt_tab: {
    color: '#000000',
    fontSize: ScreenUtil.setSpText(14),
  },
  txt_btn: {
    color: '#FFFFFF',
    // fontWeight: 'bold',
    fontSize: ScreenUtil.setSpText(14),
  },
  activityIndicator: {
    marginRight: ScreenUtil.scaleSize(15),
  },
  tab: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 6,
    borderColor: 'transparent',
    height: ScreenUtil.scaleHeight(56),
  },
  tab_active: {
    borderColor: '#87CEFA',
    borderBottomWidth: 6,
  },
  btn_unconnect: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C86F7',
    shadowColor: '#0379FF',
    borderRadius: 10,
    height: ScreenUtil.scaleHeight(50),
    marginTop: ScreenUtil.scaleHeight(25),
    marginHorizontal: ScreenUtil.scaleSize(70),
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C65F7',
    paddingHorizontal: ScreenUtil.scaleHeight(16),
    borderRadius: 5,
    height: ScreenUtil.scaleHeight(36),
    width: ScreenUtil.scaleHeight(160),
    margin: ScreenUtil.scaleHeight(15),
  },
});

export default BluetoothConnectComponent;
