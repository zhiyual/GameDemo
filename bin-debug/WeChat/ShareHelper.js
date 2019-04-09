var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShareHelper = (function () {
    function ShareHelper() {
    }
    ShareHelper.Share = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            WXHelper.instance.shareMsg(_this.getShareObj())
                .then(function () {
                resolve();
            })
                .catch(function () {
                reject();
            });
        });
    };
    /**获取分享信息 */
    ShareHelper.getShareObj = function () {
        // console.log(obj)
        // let title = this.handleMsg(obj.shareid, obj.area);
        // let imageUrl = App.config.shareCfg.getRandomImg(obj.shareid, obj.area);
        // let title = App.config.shareMsg;
        // let imageUrl = App.config.shareImg;
        var _info = App.config.shareInfo;
        var rsl = {
            title: _info.msg,
            imageUrl: _info.img
        };
        return rsl;
    };
    Object.defineProperty(ShareHelper, "isOpenRtMsg", {
        // SHIT
        /**是否打开分享提示 */
        get: function () {
            var nt = new Date().getTime();
            return nt > ShareHelper.OpenRtTime;
        },
        enumerable: true,
        configurable: true
    });
    // private static handleMsg(shareid: number, area?: string) {
    //     let rsl = App.config.shareCfg.getRandomMsg(shareid, area);
    //     rsl = rsl.replace(/###/gi, App.play.score + "");
    //     rsl = rsl.replace(/\$\$\$/gi, App.user.nickName || "");
    //     return rsl;
    // }
    ShareHelper.OpenRtTime = 0;
    return ShareHelper;
}());
__reflect(ShareHelper.prototype, "ShareHelper");
var SharePoint = (function () {
    function SharePoint() {
    }
    /**微信右上角 */
    SharePoint.share_p1 = {
        sure: ""
    };
    /**分享获得体力 */
    SharePoint.share_p2 = {
        sure: "成功获得体力"
    };
    /**分享获得盾牌 */
    SharePoint.share_p3 = {
        sure: "成功获得盾牌"
    };
    /**分享复活 */
    SharePoint.share_p4 = {
        sure: "成功获得复活无敌"
    };
    /**排行榜界面 */
    SharePoint.share_p5 = {
        sure: "分享成功"
    };
    /**获得金币 */
    SharePoint.share_p6 = {
        sure: "成功获得金币"
    };
    return SharePoint;
}());
__reflect(SharePoint.prototype, "SharePoint");
//# sourceMappingURL=ShareHelper.js.map