module.exports = {
    // plugins: {
    //     autoprefixer: {
    //         browsers: ["Android >= 4.0", "iOS >= 7"],
    //     },
    //     "postcss-pxtorem": {
    //         rootValue: 16,
    //         //这是基准值，在375px的屏幕变大rem的值会变大，小于这个大小元素的rem值会变小
    //         propList: ["*"],
    //     },
    // },
    // 上面方式会造成启动报错
    plugins: {
        'autoprefixer': {
            overrideBrowserslist: [
                "Android >= 4.1",
                "iOS >= 7",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8"
            ]
        },
        'postcss-pxtorem': {
            // rootValue: 37.5,
            rootValue: 16,
            propList: ['*']
        }
    }
};
