export default{
    /**
     * 校验手机号码
     * @param {Number} phone 手机号
     * @returns 
     */
    validatePhone(phone){
        const reg = /^[1](([3][0-9)|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
        return reg.test(phone)
    },

    validatePassword(password){
        const reg = /^([0-9 A-z]){0,}$/;
        console.log(reg.test(password));
        if(reg.test(password)){
            if(password.length >=8 && password.length <= 16){
                return true;
            }
        }
        return false;
    }
}