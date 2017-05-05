/**
 * Created by Administrator on 2017/5/2.
 */
import axios from 'axios';
const Util = function (win) {
    /**
     * 定义一系列变量
     * */
    var Util = {};
    var base_url = '//www.owulia.com/ink';
    /**
     * 根据是线上环境还是本地环境，选取不同的server_url的值
     * */
    if(win.location.href.indexOf('localhost') > -1){
        base_url = 'http://localhost:8088';
    }

    /**
     * 公用请求ajax的方式
     * */
    Util.ajax = function (path, data, http_method, success_callback, fail_callback) {
        axios({
            url: path,
            method: http_method,
            baseURL: base_url,
            params: data
        }).then( function (response) {
            success_callback && success_callback(response.data);
            fail_callback && fail_callback( result );
        }).catch( function (error) {
            fail_callback && fail_callback( error );
        });
    };
    return Util;
} (window);
export default Util;
