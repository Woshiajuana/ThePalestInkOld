/**
 * Created by Administrator on 2017/5/2.
 */
import axios from 'axios'
import Tool from './Tool'
import router from '../../router/index'
const Util = function (win) {

    /**
     * 定义一系列变量
     * */
    var Util = {},
        base_url = '//www.owulia.com/ink';

    /**
     * 根据是线上环境还是本地环境，选取不同的server_url的值
     * */
    if (win.location.href.indexOf('localhost') > -1){
        base_url = 'http://localhost:8088';
    }

    /**用户登录*/
    Util.login = function (user,success_callback, fail_callback) {
        Util.ajax( '/thepalestink/login', user, 'POST', success_callback, fail_callback );
    };

    /**验证注册时信息是否已存在*/
    Util.checkUserRepeat = function (user_msg,success_callback, fail_callback) {
        Util.ajax( '/thepalestink/checkUserRepeat', {user_msg}, 'GET', success_callback, fail_callback );
    };

    /**发送邮件*/
    Util.sendEmail = function (user_email,success_callback,fail_callback) {
        Util.ajax( '/thepalestink/sendEmail', {user_email:user_email}, 'GET', success_callback, fail_callback );
    };

    /**用户注册*/
    Util.register = function (new_user,success_callback, fail_callback) {
        Util.ajax( '/thepalestink/register', new_user, 'POST', success_callback, fail_callback );
    };

    /**
     * 请求总共可用余额
     * */
    Util.fetchTotalBalance = function (user_name,success_callback, fail_callback) {
        Util.ajax( '/thepalestink/fetchTotalBalance', {user_name: user_name}, 'GET', success_callback, fail_callback );
    };

    /**
     * 添加账单
     * */
    Util.addBill = function (bill, success_callback, fail_callback) {
        Util.ajax( '/thepalestink/addBill', bill, 'GET', success_callback, fail_callback );
    };

    /**
     * 请求账单
     * */
    Util.fetchBill = function (obj, success_callback, fail_callback) {
        Util.ajax( '/thepalestink/fetchBill',obj,'GET', success_callback,fail_callback);
    };

    /**
     * 删除账单
     * */
    Util.removeBill = function (user_name, bill, success_callback, fail_callback) {
        Util.ajax( '/thepalestink/removeBill',{user_name:user_name,bill: bill},'GET', success_callback,fail_callback);
    };

    /**修改密码*/
    Util.modifyPassword = function (obj,success_callback,fail_callback) {
        Util.ajax( '/thepalestink/modifyPassword',obj,'GET', success_callback,fail_callback);
    };

    /**找回密码*/
    Util.retrievePassword = function (obj,success_callback,fail_callback) {
        Util.ajax( '/thepalestink/retrievePassword',obj,'GET', success_callback,fail_callback);
    };

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
            var data = response.data;
            /**没有登录跳转登录页面*/
            if (data.status === -1) {
                Tool.dataToSessionStorageOperate.remove('user');
                Tool.dataToSessionStorageOperate.remove('token');
                router.push('/login');
            } else if (data.status === 2) {
                router.push('/error');
            } else {
                success_callback && success_callback(data);
            }
        }).catch( function (error) {
            fail_callback && fail_callback( error );
        });
    };

    /**
     * 总共可用余额
     * */
    Util.TotalBalance = {
        /**查询*/
        query () {
            return +Tool.dataToLocalStorageOperate.achieve('total_balance') || 0;
        },
        /**存储可用余额*/
        save ( total_balance ) {
            Tool.dataToLocalStorageOperate.save('total_balance',total_balance);
        }
    };

    return Util;
} (window);
export default Util;
