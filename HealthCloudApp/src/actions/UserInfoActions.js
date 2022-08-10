import * as types from './types';

/**
 * @name 性别状态
 * @param {*} data 
 * @returns 
 */
export const genderSetState = (data) => ({
    type: types.GENDER_SET,
    data: data
});

/**
 * @name 生日日期状态
 * @param {*} data 
 * @returns 
 */
export const birthdaySetState = (data) =>({
    type: types.BIRTHDAY_SET,
    data: data
});

/**
 * @name 电话号码状态
 * @param {*} data 
 * @returns 
 */
export const phoneNumState = (data) => ({
    type: types.MOBILE_NUMBER_SET,
    data: data
})

