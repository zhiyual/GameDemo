
class EventManager {
    private EList: {[index: string]: EventData[]} = {};

    /**
     * 添加监听
     */
    public addListener(ename: EventName, callBack: Function, callBackObj) {
        // if (this.EList[ename]) {
        //     console.log('不要重复注册！')
        //     return;
        // }
        // this.EList[ename] = new EventData(callBack, callBackObj)
        if (!this.EList[ename]) this.EList[ename] = [];

        let l = this.EList[ename].length;
        for (var i=0;i<l;i++) {
            if (this.EList[ename][i].callBack == callBack && this.EList[ename][i].callBackObj == callBackObj) {
                console.log('不可重复监听！');
                return ;
            }
        }

        let d = new EventData(callBack, callBackObj);
        this.EList[ename].push(d);
    }

    /**
     * 取消监听
     */
    public delListener(ename: EventName, callBack: Function, callBackObj?: any) {
        if (this.EList[ename]) {
            let l = this.EList[ename].length;
            for (let i=0;i<l;i++) {
                if (this.EList[ename][i].callBack === callBack) {
                    if (callBackObj) {
                        if (this.EList[ename][i].callBackObj === callBackObj) {
                            this.EList[ename].splice(i, 1);
                            break;
                        }
                    } else {
                        this.EList[ename].splice(i, 1);
                        break;
                    }
                }
            }
        }
        
        if (this.EList[ename].length == 0) delete this.EList[ename];
    }

    /**
     * 触发监听
     */
    public disListener(ename: EventName, ...Params) {
        if (this.EList[ename]) {
            let l = this.EList[ename].length;
            for (let i=0;i<l;i++) {
                if (this.EList[ename][i].callBack) {
                    if (Params) {
                        this.EList[ename][i].callBack.call(this.EList[ename][i].callBackObj, ...Params);
                    } else {
                        this.EList[ename][i].callBack.call(this.EList[ename][i].callBackObj, '');
                    }
                }
            }
        }
    }
}

class EventData {
    public constructor(cb: Function, cbobj) {
        this.callBack = cb;
        this.callBackObj = cbobj;
    }
    public callBack: Function;
    public callBackObj;
}

enum EventName {
    /**测试事件1 */
    TestEvent1,
    /**测试事件2 */
    TestEvent2,
}