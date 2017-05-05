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
            if(typeof data_name != 'undefined' && typeof data_value != 'undefined')
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
            if(typeof data_name != 'undefined' && typeof data_value != 'undefined')
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
    /**
     * 格式化时间
     * */
    Tool.format = function(fmt) {
        var time = new Date();
        var o = {
            "M+" : time.getMonth()+1,
            "d+" : time.getDate(),
            "h+" : time.getHours(),
            "m+" : time.getMinutes(),
            "s+" : time.getSeconds(),
            "q+" : Math.floor((time.getMonth()+3)/3),
            "S"  : time.getMilliseconds()
        };
        if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    return Tool;
} (window);
export default Tool;
