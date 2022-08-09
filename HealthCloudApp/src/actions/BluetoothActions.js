import * as types from './types';

/**
 * @name 蓝牙连接状态
 * @param  {*} data
 * @returns
 */

export const bluetoothConnectState = (data) => ({
    type: types.BLUE_TOOTH_CONNECT_STATE,
    data,
});

/**
 * @name 当前连接设备
 * @param {*} data
 * @returns
 */
 export const bluetoothDevice = (data) => ({
    type: types.BLUE_TOOTH_DEVICE,
    data,
  });

  /**
 * @name 开启对蓝牙模块读数据事件的监听
 * @param {*} data
 * @param {*} onSuccess
 * @param {*} onError
 * @returns
 */
 export const bluetoothRead = (data, onSuccess, onError) => ({
    type: types.BLUE_TOOTH_READ,
    data,
    onSuccess,
    onError,
  });


  