/**
 * Created by Administrator on 2017/5/2.
 */
const Tool = function (win) {
    let Tool = {};
    /**
     * 操作数据到sessionstorage
     * */
    Tool.dataToSessionStorageOperate = {
        /**存储*/
        save: function (data_name,data_value) {
            if(data_name && data_value)
                sessionStorage.setItem(data_name,JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function (data_name) {
            var data_value = sessionStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function (data_name) {
            if(data_name)
                sessionStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function () {
            sessionStorage.clear();
        }
    };
    /**
     * 操作数据到localstorage
     * */
    Tool.dataToLocalStorageOperate = {
        /**存储*/
        save: function (data_name,data_value) {
            if(data_name && data_value)
                localStorage.setItem(data_name,JSON.stringify(data_value));
        },
        /**取出*/
        achieve: function (data_name) {
            var data_value = localStorage.getItem(data_name);
            data_value && (data_value = JSON.parse(data_value));
            return data_value;
        },
        /**删除*/
        remove: function (data_name) {
            if(data_name)
                localStorage.removeItem(data_name);
        },
        /**清空*/
        clear: function () {
            localStorage.clear();
        }
    };
    return Tool;
} (window);
export default Tool;
