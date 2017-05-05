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
