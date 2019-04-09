var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AdHelper = (function () {
    function AdHelper() {
    }
    AdHelper.createBannerAd = function () {
        var _this = this;
        if (this.bannerBottomAd)
            this.bannerBottomAd.destroy();
        this.bannerBottomAd = wx.createBannerAd({
            adUnitId: this.bannerBottomAdID,
            style: {
                left: 0,
                top: window.screen.availHeight,
                width: 450,
            }
        });
        this.bannerBottomAd.show().then(function () {
            // 0.2869
            //0.1276
            var widthr = window.screen.availHeight * 0.1276 / 0.2869;
            _this.bannerBottomAd.style.width = widthr;
            _this.bannerBottomAd.style.top = window.screen.availHeight - _this.bannerBottomAd.style.realHeight;
            _this.bannerBottomAd.style.left = (window.screen.availWidth - widthr) / 2;
            console.log("this.bannerAd.style.realHeight", _this.bannerBottomAd.style);
        });
        this.bannerBottomAd.onResize(function (res) {
            _this.bannerBottomAd.style.top = window.screen.availHeight - res.height;
        });
        this.bannerBottomAd.onError(function (err) {
            console.log("bannerAd拉取错误", err);
        });
    };
    AdHelper.hideBannerAd = function (bannerAdItem) {
        bannerAdItem.hide();
    };
    AdHelper.showBannerAd = function (bannerAdItem) {
        bannerAdItem.show();
    };
    /**
     * 游戏底部广告ID
     */
    AdHelper.bannerBottomAdID = "adunit-e990415095ef770e";
    return AdHelper;
}());
__reflect(AdHelper.prototype, "AdHelper");
//# sourceMappingURL=AdHelper.js.map