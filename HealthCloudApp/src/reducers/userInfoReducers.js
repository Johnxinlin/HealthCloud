import * as types from '../actions/types';

const initUserInfo = { phoneNum:'', birthDay:'', gender:''};

const  userInfoReducers = (state = initUserInfo, action) => {
    switch(action.type){
        case types.MOBILE_NUMBER_SET:
            return {...state, ...action.data};
        case types.BIRTHDAY_SET:
            return {...state, ...action.data};
        case types.GENDER_SET:
            return {...state, ...action.data};
        default:
            return state;
    }
}

export default userInfoReducers;