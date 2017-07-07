module.exports = {
    // 匹配字母 + 数字
    access:( str ) => {
        return /[a-zA-Z0-9]/.test(str);
    }
}