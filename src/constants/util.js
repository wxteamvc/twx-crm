/**
 * 网络请求
 *
 */

'use strict';

let Util = {
    /**
     * http get 请求简单封装
     * @param url 请求的URL
     * @param successCallback 请求成功回调
     * @param failCallback 请求失败回调
     */
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    /**
     * http post 请求简单封装
     * @param url 请求的URL
     * @param data post的数据
     * @param successCallback 请求成功回调
     * @param failCallback failCallback 请求失败回调
     */
    post: (url, data, successCallback, failCallback) => {
        let num = 0;
        let formData;
        //判断data是否为空
        for (let key in data) {
            num++;
        }
        if (num == 0) {
            formData = null;
        } else {
            formData = new FormData();
            Object.keys(data).map(function (key) {
                var value = data[key];
                if (value instanceof Array) {
                    let itemData = new FormData();
                    Object.keys(value).map((k) => {
                        itemData = formData.append(k, value[k]);
                    })
                    formData.append(`${key}[]`, itemData);
                } else {
                    formData.append(key, value);
                }
            });
        }
        let fetchOptions = {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                'token': global.token,
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData
            // body: JSON.stringify(data)
        };
        fetch(url, fetchOptions)
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((err) => {
                failCallback(err);
            });
    },

    /**
     * 日志打印
     * @param obj
     */
    log: (obj) => {
        var description = "";
        for (let i in obj) {
            let property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    },
};

export default Util;