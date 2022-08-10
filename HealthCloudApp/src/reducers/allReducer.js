import bluetoothReducers from "./bluetoothReducers";
import userInfoReducers from "./userInfoReducers";
import {combineReducers} from 'redux';

export const allReducer = combineReducers({
    bluetooth:bluetoothReducers,
    userInfo:userInfoReducers
});
