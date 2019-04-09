var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WXVideoAd = (function () {
    function WXVideoAd() {
        /**广告单元ID */
        this.adUnitId = "adunit-6ccde69a23bb03d6";
        /**需要的微信SDK版本 */
        this.needSDKVersion = "2.0.4";
        // private _scb: Function;
        // private _ecb: Function;
        this.isListenLocalClose = false;
    }
    Object.defineProperty(WXVideoAd, "instance", {
        get: function () {
            if (!this._instance)
                this._instance = new WXVideoAd();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**判断基础库版本是否符合 */
    WXVideoAd.prototype.isSDKVersionOK = function () {
        if (!WXHelper.isWxgame)
            return false;
        var stm = WXHelper.instance.getSystemInfoSync;
        var rsl = Utils.CompVersion(stm.SDKVersion, this.needSDKVersion);
        return rsl >= 0;
    };
    /**创建一个广告 */
    WXVideoAd.prototype.createAd = function () {
        if (!this.isSDKVersionOK)
            return null;
        this._ad = wx.createRewardedVideoAd({ adUnitId: this.adUnitId });
        if (!this.isListenLocalClose) {
            this._ad.onClose(this.OnAdClose);
            this.isListenLocalClose = true;
        }
    };
    /**展示广告 */
    WXVideoAd.prototype.LookAd = function (aid) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this._scb = resolve;
            // this._ecb = reject;
            if (!_this._ad || _this.adUnitId != aid) {
                _this.adUnitId = aid;
                _this.createAd();
                // this._ad.onClose(res => {
                //     if (res && res.isEnded || res === undefined) {
                //         // 完整播放，可以发奖励
                //         // resolve();
                //         this._scb && this._scb();
                //     } else {
                //         // 不完整播放
                //         // reject({errCode: 10003});
                //         this._ecb && this._ecb({errCode: 10003});
                //     }
                // })
                // this._ad.onError(res => {
                //     // reject({errCode: 10002});
                //     this._ecb && this._ecb({errCode: 10002});
                // })
            }
            if (!_this._ad) {
                reject({ errCode: 10001 });
            }
            _this._ad.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    // 完整播放，可以发奖励
                    resolve();
                    // this._scb && this._scb();
                }
                else {
                    // 不完整播放
                    reject({ errCode: 10003 });
                    // this._ecb && this._ecb({errCode: 10003});
                }
            });
            _this._ad.onError(function (res) {
                reject({ errCode: 10002 });
                // this._ecb && this._ecb({errCode: 10002});
            });
            _this._ad.show().catch(function () {
                // this.loadAd();
                _this._ad.load().then(function () {
                    _this._ad.show();
                });
            });
        });
    };
    WXVideoAd.prototype.OnAdClose = function (res) {
        if (res && res.isEnded || res === undefined) {
            // 完整播放，做统计
            // Utils.UpdateVideoAdNum();
        }
    };
    WXVideoAd.prototype.loadAd = function () {
        var _this = this;
        this._ad.load()
            .then(function () {
            _this._ad.show();
        })
            .catch(function () {
            _this.loadAd();
        });
    };
    WXVideoAd.prototype.OnCloseAd = function () {
        this._ad.onClose(function (res) {
            if (res && res.isEnded || res === undefined) {
                // 完整播放，可以发奖励
            }
            else {
                // 不完整播放
            }
        });
    };
    return WXVideoAd;
}());
__reflect(WXVideoAd.prototype, "WXVideoAd");
var VideoAd_AID = (function () {
    function VideoAd_AID() {
    }
    /**进入关卡界面----获得护盾 */
    VideoAd_AID.aid1 = "adunit-6ccde69a23bb03d6";
    /**金币不足界面----获得金币 */
    VideoAd_AID.aid2 = "adunit-abd35fda2e16a3ad";
    return VideoAd_AID;
}());
__reflect(VideoAd_AID.prototype, "VideoAd_AID");
//# sourceMappingURL=WXVideoAd.js.map