var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
        this.Excs = [0, 0];
        this.GlobalScale = 1;
    }
    LayerManager.prototype.InitLayer = function (stage) {
        this._stage = new egret.DisplayObjectContainer();
        stage.addChild(this._stage);
        this.AdapterWindow();
        this._playLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._playLayer);
        this._tipLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._tipLayer);
        this._loadingLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._loadingLayer);
    };
    LayerManager.prototype.AdapterWindow = function () {
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
        if (scale_s < scale_c) {
            // 全面屏
            var x = sw / sh * gameH;
            this._stage.x += (x - gameW) / 2;
            console.log("全面", x);
            this.Excs = [(x - gameW) / 2, 0];
            this.GlobalScale = x / gameW;
        }
        if (scale_s > scale_c) {
            // paid屏
            var y = sh / sw * gameW;
            this._stage.y += (y - gameH) / 2;
            console.log("ipad", y);
            this.Excs = [0, (y - gameH) / 2];
            this.GlobalScale = y / gameH;
        }
    };
    Object.defineProperty(LayerManager.prototype, "playLayer", {
        get: function () {
            if (!this._playLayer)
                this.InitLayer(App.gameStage);
            return this._playLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "tipLayer", {
        get: function () {
            if (!this._tipLayer)
                this.InitLayer(App.gameStage);
            return this._tipLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "loadingLayer", {
        get: function () {
            if (!this._loadingLayer)
                this.InitLayer(App.gameStage);
            return this._loadingLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager.prototype, "stage", {
        get: function () {
            if (!this._stage)
                this.InitLayer(App.gameStage);
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map