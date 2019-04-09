var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserManager = (function () {
    function UserManager() {
        // 玩家信息
        //============================================
        this._UserDB = {
            name: "",
            avater: "",
        };
        this.isLogin = false;
    }
    Object.defineProperty(UserManager.prototype, "user_info", {
        get: function () {
            return this._UserDB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "user_name", {
        get: function () {
            return this._UserDB.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "user_avater", {
        get: function () {
            return this._UserDB.avater;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManager.prototype, "user_openid", {
        get: function () {
            return this.openId;
        },
        set: function (_user_openid) {
            this.openId = _user_openid;
            console.log("this.openId", this.openId);
        },
        enumerable: true,
        configurable: true
    });
    UserManager.prototype.InitUserInfo = function (info) {
        this._UserDB = info;
        this.isLogin = true;
    };
    return UserManager;
}());
__reflect(UserManager.prototype, "UserManager");
//# sourceMappingURL=UserManager.js.map