/**
 * Created by Administrator on 2017/5/2.
 * 本工具让该应用的数据存储在本地LocalStorage中
 */
import Tool from './Tool'
const Util = function (win) {
    var Util = {};
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
