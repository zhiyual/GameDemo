var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /**
     * localStorage 写入
     */
    Utils.WriteLocalStorage = function (k, v) {
        if (window.localStorage) {
            window.localStorage.setItem(k, v);
            return true;
        }
        else {
            console.log('浏览器不支持LocalStorage');
            return false;
        }
    };
    /**
     * localStorage 读取
     */
    Utils.ReadLocalStorage = function (k) {
        if (window.localStorage) {
            return window.localStorage.getItem(k);
        }
        else {
            console.log('浏览器不支持LocalStorage');
            return null;
        }
    };
    /**
     * localStorage 删除
     */
    Utils.DeleteLocalStorage = function (k) {
        if (window.localStorage) {
            window.localStorage.removeItem(k);
            return true;
        }
        else {
            console.log('浏览器不支持LocalStorage');
            return false;
        }
    };
    /**
     * 获取一个随机数
     */
    Utils.GetRandomNum = function (min, max) {
        var k = max - min + 1;
        return Math.floor(Math.random() * k + min);
    };
    /**概率 百分比 */
    Utils.getProbability = function (num) {
        return Math.random() > (1 - num);
    };
    /**log */
    Utils.log = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        switch (param.length) {
            case 1:
                console.log(param[0]);
                break;
            case 2:
                console.log(param[0], param[1]);
                break;
            case 3:
                console.log(param[0], param[1], param[2]);
                break;
            default:
                console.log(param);
        }
    };
    /**
     * 对比两个版本号
     * 格式 X.X.X
     * @param v1 版本号1
     * @param v2 版本号2
     * @return 0 版本相同
     * @return 1 版本1较大
     * @return -1 版本1较小
     */
    Utils.CompVersion = function (v1, v2) {
        var arr1 = v1.split(".");
        var arr2 = v2.split(".");
        var nv1 = parseInt(arr1[0]) * 1000000 + parseInt(arr1[1]) * 1000 + parseInt(arr1[2]);
        var nv2 = parseInt(arr2[0]) * 1000000 + parseInt(arr2[1]) * 1000 + parseInt(arr2[2]);
        if (nv1 == nv2)
            return 0;
        if (nv1 > nv2)
            return 1;
        if (nv1 < nv2)
            return -1;
    };
    Utils.ToBoolean = function (a) {
        var rsl = true;
        if (!a || a == 0 || a == "false")
            rsl = false;
        return a;
    };
    Object.defineProperty(Utils, "isFullScreen", {
        get: function () {
            var sw = window.screen.availWidth;
            var sh = window.screen.availHeight;
            return sh / sw > 16 / 9;
        },
        enumerable: true,
        configurable: true
    });
    /**对比两个日期是否同一天 */
    Utils.CompareOneDay = function (t1, t2) {
        var d1 = new Date(t1);
        var d2 = new Date(t2);
        return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
    };
    /**
     * 预设颜色值
     */
    Utils.DefaultColor = {
        /**黑色 */
        black: 0x010101,
        /**黄色 */
        yellow: 0xfff600,
        /**紫色 */
        purple: 0xd600ff,
        /**红色 */
        red: 0xff0000,
        /**绿色 */
        green: 0x00ff00,
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
var LocalStorage_Key = (function () {
    function LocalStorage_Key() {
    }
    /**金币 */
    LocalStorage_Key.GOLD = "gold";
    /**背包 */
    LocalStorage_Key.BAG = "bag";
    /**使用的皮肤 */
    LocalStorage_Key.UseSkin = "uskin";
    /**体力 */
    LocalStorage_Key.Power = "power";
    /**最后一次体力变更 */
    LocalStorage_Key.LastUpdatePower = "LU_power";
    /**关卡进度 */
    LocalStorage_Key.Progress = "progress";
    /**分享获取体力记录 */
    LocalStorage_Key.ShareRecord_1 = "sharerecord_1";
    /**满收集领取记录 */
    LocalStorage_Key.RecordFC = "fc_rcd";
    /**分享获得盾牌记录 */
    LocalStorage_Key.RecordSD = "sd_rcd";
    /**广告获得金币记录 */
    LocalStorage_Key.RecordGD = "gd_rcd";
    /**广告次数记录 */
    LocalStorage_Key.RecordAdNum = "adn_rcd";
    /**是否进去了关卡1 */
    LocalStorage_Key.playerLevelOne = "playerLevelOne";
    /**是否进去了关卡2 */
    LocalStorage_Key.playerLevelTwo = "playerLevelTwo";
    return LocalStorage_Key;
}());
__reflect(LocalStorage_Key.prototype, "LocalStorage_Key");
//# sourceMappingURL=Utils.js.map