/**
 * Created by Administrator on 2017/3/31.
 */
const GestureMobile = (function (win,doc,undefined) {
    var options;
    function GestureMobile(ele,opt){
        if(!ele) return this;
        options = opt || {};
        if(ele instanceof HTMLElement){
            this.ele = ele;
        }else{
            options = ele || {};
            this.ele = doc.body;
        }
        this.mode = options.mode || 'touchend';
        this.sensitive = typeof options.sensitive != 'undefined' ? options.sensitive : 10;
        this.touchStartCallBackFun = options.touchStartCallBackFun;
        this.upCallBackFun = options.upCallBackFun;
        this.downCallBackFun = options.downCallBackFun;
        this.leftCallBackFun = options.leftCallBackFun;
        this.rightCallBackFun = options.rightCallBackFun;
        this.failCallBackFun = options.failCallBackFun;
        this.init();
    }
    GestureMobile.prototype = {
        init: function () {
            //绑定事件
            _addEvent(this)
        }
    };
    var _addEvent = function (that) {
        var startX, startY,endX, endY;
        that.ele.addEventListener("touchstart",function(ev){
            startX = ev.targetTouches[0].pageX;
            startY = ev.targetTouches[0].pageY;
            that.touchStartCallBackFun && that.touchStartCallBackFun();
        },false);
        that.ele.addEventListener(that.mode,function(ev){
            if(that.mode == 'touchend'){
                endX = ev.changedTouches[0].pageX;
                endY = ev.changedTouches[0].pageY;
            }else{
                endX = ev.targetTouches[0].pageX;
                endY = ev.targetTouches[0].pageY;
            }
            var result = _getSlideDirection(that,startX, startY, endX, endY),
                direction = result.direction,
                distance = result.distance;
            switch (direction){
                case 0:
                    //没有滑动
                    that.failCallBackFun && that.failCallBackFun(distance);
                    break;
                case 1:
                    //向上滑动
                    that.upCallBackFun && that.upCallBackFun(distance);
                    break;
                case 2:
                    //向下滑动
                    that.downCallBackFun && that.downCallBackFun(distance);
                    break;
                case 3:
                    //向左滑动
                    that.leftCallBackFun && that.leftCallBackFun(distance);
                    break;
                case 4:
                    //向右滑动
                    that.rightCallBackFun && that.rightCallBackFun(distance);
                    break;
                default:
            }
        },false);
    };
    //返回角度的方法
    var _getSlideAngle = function (dx, dy){
        return Math.atan2(dy, dx) * 180 / Math.PI;
    };
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    var _getSlideDirection = function (that,startX, startY, endX, endY){
        var dy = startY - endY,
            dx = endX - startX,
            direction = 0;
        //如果滑动距离太短
        if (!(Math.abs(dx) < that.sensitive && Math.abs(dy) < that.sensitive)) {
            var angle = _getSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                direction = 4;
            } else if (angle >= 45 && angle < 135) {
                direction = 1;
            } else if (angle >= -135 && angle < -45) {
                direction = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                direction = 3;
            }
        }
        return {
            direction:direction,
            distance:{
                x:dx,
                y:dy
            }
        };
    };
    return function (ele,opt) {
        return new GestureMobile(ele,opt)
    }
})(this,document);

export default GestureMobile;
