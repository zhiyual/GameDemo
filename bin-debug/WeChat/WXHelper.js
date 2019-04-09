var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WXHelper = (function () {
    function WXHelper() {
    }
    Object.defineProperty(WXHelper, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new WXHelper();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXHelper, "isWxgame", {
        /**
         * 检测是否微信环境
         */
        get: function () {
            return platform['name'] && platform['name'] == 'wxgame';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXHelper.prototype, "getSystemInfoSync", {
        /**
         * 获取设备信息
         */
        get: function () {
            if (!this._systemInfo)
                this._systemInfo = wx.getSystemInfoSync();
            return this._systemInfo;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 弹出提示框
     */
    WXHelper.prototype.showToast = function (title, icon) {
        wx.showToast({
            title: title,
            icon: icon
        });
    };
    /**
     * 退出小游戏
     */
    WXHelper.prototype.exitMiniProgram = function () {
        wx.exitMiniProgram();
    };
    /**
     * 获取用户信息
     */
    WXHelper.prototype.getUserInfo = function () {
        var __this = this;
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: function (res) {
                    resolve(res.userInfo);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
    };
    /**
     * 创建获取用户信息按钮
     */
    WXHelper.prototype.createUserInfoBtn = function () {
        var scw = window.screen.availWidth;
        var sch = window.screen.availHeight;
        var btn_w = scw * 0.4625;
        var btn_h = btn_w * 0.3243;
        return wx.createUserInfoButton({
            type: 'image',
            image: "resource/assets/views/big/ld_btn_ksyx.png",
            style: {
                left: (scw - btn_w) / 2,
                top: sch * 0.7764,
                width: btn_w,
                height: btn_h,
                backgroundColor: '#ccc000',
                borderColor: '#000000',
                borderWidth: 0,
                borderRadius: 0,
                textAlign: 'center',
                fontSize: 30,
                lineHeight: 40,
            },
            withCredentials: false,
        });
    };
    Object.defineProperty(WXHelper.prototype, "getUserInfoBtn", {
        /**
         * 获取用户信息授权按钮
         */
        get: function () {
            if (!this._getUserInfoBtn)
                this._getUserInfoBtn = this.createUserInfoBtn();
            return this._getUserInfoBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXHelper.prototype, "WX_OpenDataContext", {
        get: function () {
            if (!this._openDataContext)
                this._openDataContext = wx.getOpenDataContext();
            return this._openDataContext;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 主动吊起分享
     */
    WXHelper.prototype.shareMsg = function (obj) {
        return new Promise(function (resolve, reject) {
            var sd = new Date().getTime();
            var params = {
                title: obj.title,
                imageUrl: obj.imageUrl || "aa.png",
                query: obj.query || "action=share"
            };
            console.log('shareInfo:', params);
            wx.shareAppMessage(params);
            function callback() {
                var ed = new Date().getTime();
                if (ed - sd >= 2500) {
                    resolve();
                }
                else {
                    reject();
                }
                wx.offShow(callback);
            }
            wx.onShow(callback);
        });
    };
    /**
     * 主动托管用户数据
     */
    WXHelper.prototype.setUserCloudStorage = function (score, lv) {
        WXHelper.instance.WX_OpenDataContext.postMessage({
            'command': "updateScore",
            'score': score,
            'lv': lv
        });
    };
    Object.defineProperty(WXHelper.prototype, "clubBtn", {
        /**
         * 获取游戏圈按钮
         */
        get: function () {
            if (!this._clubBtn) {
                var scw = window.screen.availWidth;
                var sch = window.screen.availHeight;
                var phone_model = WXHelper.instance.getSystemInfoSync.model;
                this._clubBtn = wx.createGameClubButton({
                    icon: "white",
                    style: {
                        left: scw * 0.8 - 40,
                        top: Utils.isFullScreen ? 44 + 70 : 4 + 70,
                        width: 40,
                        height: 40,
                    }
                });
            }
            return this._clubBtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WXHelper.prototype, "isIPhoneX", {
        /**是否是 IPhnoe X 系列 */
        get: function () {
            var phone_model = WXHelper.instance.getSystemInfoSync.model;
            return phone_model.indexOf("iPhone X") != -1;
        },
        enumerable: true,
        configurable: true
    });
    return WXHelper;
}());
__reflect(WXHelper.prototype, "WXHelper");
//# sourceMappingURL=WXHelper.js.map