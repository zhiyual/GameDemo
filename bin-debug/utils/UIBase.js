var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var UIBase = (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        var _this = _super.call(this) || this;
        _this.AdaptType = UIBase.Adapt2;
        _this.isOpenMovie = false;
        _this.isFlashBg = false;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.OnOpen, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.OnClose, _this);
        return _this;
    }
    UIBase.prototype.OnOpen = function () {
        this.AdaptScreen();
        this.isOpened = true;
        this.tap_mask && this.tap_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTapMask, this);
        // this.AdaptIphoneX();
        this.AdaptFullScreen();
        this.OpenMovies();
        this.FlashStripeBg();
    };
    UIBase.prototype.OnClose = function () {
        this.isOpened = false;
        this.flashbg_Timer && this.flashbg_Timer.stop();
    };
    /**
     * 打开面板
     */
    UIBase.prototype.Open = function (layer) {
        if (layer === void 0) { layer = App.layer.playLayer; }
        var Params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            Params[_i - 1] = arguments[_i];
        }
        var stage = layer || App.layer.playLayer;
        switch (stage) {
            case App.layer.playLayer:
                this.OpenInPlayLayer();
                break;
            case App.layer.tipLayer:
                this.OpenInOtherLayer(stage);
                break;
            default:
                stage.addChild(this);
                break;
        }
    };
    UIBase.prototype.OpenInPlayLayer = function () {
        if (App.layer.playLayer.numChildren > 0)
            App.layer.playLayer.removeChildren();
        App.layer.playLayer.addChild(this);
    };
    UIBase.prototype.OpenInOtherLayer = function (stage) {
        var c = stage.numChildren;
        for (var i = 0; i < c; i++) {
            stage.getChildAt(i).visible = false;
        }
        stage.addChild(this);
    };
    /**
     * 关闭面板
     */
    UIBase.prototype.Close = function () {
        if (!this.parent || !this)
            return;
        var stage = this.parent;
        stage.removeChild(this);
        switch (stage) {
            case App.layer.tipLayer:
                this.CloseFromOtherLayer(stage);
                break;
        }
    };
    UIBase.prototype.CloseFromOtherLayer = function (stage) {
        var l = stage.numChildren;
        if (l > 0) {
            stage.getChildAt(l - 1).visible = true;
        }
    };
    /**
     * 全面屏适应
     */
    UIBase.prototype.AdaptScreen = function () {
        if (!this.content)
            return;
        var sw = window.screen.availWidth;
        var sh = window.screen.availHeight;
        if (sh < sw) {
            var idx = sw;
            sw = sh;
            sh = idx;
        }
        var gameW = App.StageSize.width;
        var gameH = App.StageSize.height;
        var scale_s = Math.floor(sw / sh * 100);
        var scale_c = Math.floor(gameW / gameH * 100);
        this.content.anchorOffsetX = this.content.width / 2;
        this.content.anchorOffsetY = this.content.height / 2;
        if (scale_s < scale_c) {
            // 竖屏
            var cw = sw / sh * gameH;
            this.content.scaleX = this.content.scaleY = cw / gameW;
            if (this.AdaptType == 1)
                this.content.height = gameW * (sh / sw);
        }
        if (scale_s > scale_c) {
            // 横屏
            var ch = sh / sw * gameW;
            this.content.scaleX = this.content.scaleY = ch / gameH;
            if (this.AdaptType == 1)
                this.content.width = gameH * (sw / sh);
        }
    };
    /**点击半透黑 */
    UIBase.prototype.OnTapMask = function () {
        this.Close();
    };
    /**适配IPhone X 系列 */
    UIBase.prototype.AdaptIphoneX = function () {
        if (this.AdaptType == UIBase.Adapt2)
            return;
        if (!WXHelper.isWxgame)
            return;
        if (!this.topBar)
            return;
        this.topBar.top = WXHelper.instance.isIPhoneX ? 55 : 0;
    };
    /**
     * 只要全面屏就往下挪
     * FUCK
     */
    UIBase.prototype.AdaptFullScreen = function () {
        if (this.AdaptType == UIBase.Adapt2)
            return;
        if (!WXHelper.isWxgame)
            return;
        if (!this.topBar)
            return;
        this.topBar.top = Utils.isFullScreen ? 55 : 0;
    };
    /**打开动画 */
    UIBase.prototype.OpenMovies = function () {
        if (!this.isOpenMovie)
            return;
        var sca = this.content.scaleX;
        this.content.scaleX = this.content.scaleY = sca / 2;
        egret.Tween.get(this.content)
            .to({ scaleX: sca, scaleY: sca }, 100);
    };
    /**闪动条纹背景 */
    UIBase.prototype.FlashStripeBg = function () {
        var _this = this;
        if (!this.isFlashBg)
            return;
        if (!this.stripe)
            return;
        if (!this.flashbg_Timer) {
            this.flashbg_Timer = new egret.Timer(200, 0);
            this.flashbg_Timer.addEventListener(egret.TimerEvent.TIMER, function () {
                _this.stripe.verticalCenter = _this.stripe.verticalCenter == 0 ? 8 : 0;
            }, this);
        }
        this.flashbg_Timer.reset();
        this.flashbg_Timer.start();
    };
    /**无视比例，充满屏幕 */
    UIBase.Adapt1 = 1;
    /**保持比例，缩放至显示全部内容 */
    UIBase.Adapt2 = 2;
    return UIBase;
}(eui.Component));
__reflect(UIBase.prototype, "UIBase");
//# sourceMappingURL=UIBase.js.map