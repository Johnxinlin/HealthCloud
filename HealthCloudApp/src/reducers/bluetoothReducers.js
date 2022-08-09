import * as types from '../actions/types';

const initState = { enabled:true , device: {}};

const bluetoothReducers = (state = initState, action) => {
    switch(action.type) {
        case types.BLUE_TOOTH_CONNECT_STATE:
            return{...state, ...action.data};
        case types.BLUE_TOOTH_DEVICE:
            return { ...state, ...action.data };
        default:
            return state;
    }
}

export default bluetoothReducers;