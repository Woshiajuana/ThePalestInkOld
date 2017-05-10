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
        // base_url = '';
    }

    /**用户登录*/
    Util.login = function (user,success_callback, fail_callback) {
        console.log(1)
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
    Util.fetchTotalBalance = function (success_callback, fail_callback) {
        Util.ajax( '/thepalestink/fetchTotalBalance', '', 'GET', success_callback, fail_callback );
    };

    /**
     * 公用请求ajax的方式
     * */
    Util.ajax = function (path, data, http_method, success_callback, fail_callback) {
        console.log(2)
        axios({
            url: path,
            method: http_method,
            baseURL: base_url,
            params: data
        }).then( function (response) {
            var data = response.data;
            console.log(3)
            /**没有登录跳转登录页面*/
            if (data.status === -1) {
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

    /**
     * 账单
     * */
    Util.Bill = {
        /**
         * 查询消费账单
         * */
        query ( query_condition ) {
            var bill_arr = Tool.dataToLocalStorageOperate.achieve('bill_arr') || [];
            if( query_condition ){
                var year_value = query_condition.year_value;
                var month_value = query_condition.month_value;
                var day_value = query_condition.day_value;
                var check_value_arr = query_condition.check_value_arr;
                if(year_value){
                    var arr = [];
                    bill_arr.forEach((item,index) => {
                        if(item.date_value.split('-')[0] == year_value){
                            arr.push(item);
                        }
                    });
                    bill_arr = arr;
                }
                if(month_value){
                    var arr = [];
                    bill_arr.forEach((item,index) => {
                        if(item.date_value.split('-')[1] == month_value){
                            arr.push(item);
                        }
                    });
                    bill_arr = arr;
                }
                if(day_value){
                    var arr = [];
                    bill_arr.forEach((item,index) => {
                        if(item.date_value.split('-')[2] == day_value){
                            arr.push(item);
                        }
                    });
                    bill_arr = arr;
                }
                if(check_value_arr.length){
                    var arr = [];
                    check_value_arr.forEach((item,index) => {
                        bill_arr.forEach((it,i) => {
                            if(it.billTypeNumber == item){
                                arr.push(it);
                            }
                        });
                    });
                    bill_arr = arr;
                }
            }
            return bill_arr;
        },
        /**
         * 存储账单
         * */
        save ( bill ) {
            if ( !bill ) return;
            if ( bill.consumption_or_earn == 0 ){
                /**消费账单*/
                Util.TotalBalance.save(+Util.TotalBalance.query() - (+bill.sum_value))
            } else {
                /**入账账单*/
                Util.TotalBalance.save(+Util.TotalBalance.query() + (+bill.sum_value))
            }
            var bill_arr = Util.Bill.query();
            bill_arr.unshift( bill );
            Tool.dataToLocalStorageOperate.save('bill_arr',bill_arr);
        },
        /**
         * 删除账单
         * */
        remove ( bill ) {
            var bill_arr = this.query();
            bill_arr.forEach( (item,index) => {
                if( item._id == bill._id ) {
                    bill_arr.splice(index, 1);
                    if ( bill.consumption_or_earn == 0 ){
                        /**消费账单*/
                        Util.TotalBalance.save(+Util.TotalBalance.query() + (+bill.sum_value))
                    } else {
                        /**入账账单*/
                        Util.TotalBalance.save(+Util.TotalBalance.query() - (+bill.sum_value))
                    }
                    return;
                }
            });
            Tool.dataToLocalStorageOperate.save('bill_arr',bill_arr)
        }
    };
    return Util;
} (window);
export default Util;
