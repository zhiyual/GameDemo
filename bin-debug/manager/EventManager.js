var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EventManager = (function () {
    function EventManager() {
        this.EList = {};
    }
    /**
     * 添加监听
     */
    EventManager.prototype.addListener = function (ename, callBack, callBackObj) {
        // if (this.EList[ename]) {
        //     console.log('不要重复注册！')
        //     return;
        // }
        // this.EList[ename] = new EventData(callBack, callBackObj)
        if (!this.EList[ename])
            this.EList[ename] = [];
        var l = this.EList[ename].length;
        for (var i = 0; i < l; i++) {
            if (this.EList[ename][i].callBack == callBack && this.EList[ename][i].callBackObj == callBackObj) {
                console.log('不可重复监听！');
                return;
            }
        }
        var d = new EventData(callBack, callBackObj);
        this.EList[ename].push(d);
    };
    /**
     * 取消监听
     */
    EventManager.prototype.delListener = function (ename, callBack, callBackObj) {
        if (this.EList[ename]) {
            var l = this.EList[ename].length;
            for (var i = 0; i < l; i++) {
                if (this.EList[ename][i].callBack === callBack) {
                    if (callBackObj) {
                        if (this.EList[ename][i].callBackObj === callBackObj) {
                            this.EList[ename].splice(i, 1);
                            break;
                        }
                    }
                    else {
                        this.EList[ename].splice(i, 1);
                        break;
                    }
                }
            }
        }
        if (this.EList[ename].length == 0)
            delete this.EList[ename];
    };
    /**
     * 触发监听
     */
    EventManager.prototype.disListener = function (ename) {
        var Params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            Params[_i - 1] = arguments[_i];
        }
        if (this.EList[ename]) {
            var l = this.EList[ename].length;
            for (var i = 0; i < l; i++) {
                if (this.EList[ename][i].callBack) {
                    if (Params) {
                        (_a = this.EList[ename][i].callBack).call.apply(_a, [this.EList[ename][i].callBackObj].concat(Params));
                    }
                    else {
                        this.EList[ename][i].callBack.call(this.EList[ename][i].callBackObj, '');
                    }
                }
            }
        }
        var _a;
    };
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
var EventData = (function () {
    function EventData(cb, cbobj) {
        this.callBack = cb;
        this.callBackObj = cbobj;
    }
    return EventData;
}());
__reflect(EventData.prototype, "EventData");
var EventName;
(function (EventName) {
    /**测试事件1 */
    EventName[EventName["TestEvent1"] = 0] = "TestEvent1";
    /**测试事件2 */
    EventName[EventName["TestEvent2"] = 1] = "TestEvent2";
})(EventName || (EventName = {}));
//# sourceMappingURL=EventManager.js.map