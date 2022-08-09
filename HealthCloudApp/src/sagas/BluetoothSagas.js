import { BluetoothSerial } from "react-native-bluetooth-serial";
import { takeLatest } from "redux-saga/effects";
import { Buffer } from "buffer";
import * as types from "../actions/types";
// import { read } from "fs";

export function* readBTData(action) {
    try{
        let datas = [1024];
        BluetoothSerial.withDelimiter("\r").then(()=>{
            BluetoothSerial.on('read', (btdata) => {
                let buffer = Buffer.from(btdata.data.trim(), 'hex');
                datas = buffer.toJSON().data;
                console.log(typeof buffer.toJSON(), datas);
            })
        })
    }catch(error){
        console.log('error', error);
    }
}

export function* watchReadBTData(){
    yield takeLatest(types.BLUE_TOOTH_READ, readBTData);
}