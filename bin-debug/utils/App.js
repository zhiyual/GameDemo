var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "layer", {
        get: function () {
            if (!this._layer)
                this._layer = new LayerManager();
            return this._layer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "panel", {
        get: function () {
            if (!this._panel)
                this._panel = new PanelManager();
            return this._panel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "event", {
        get: function () {
            if (!this._event)
                this._event = new EventManager();
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "audio", {
        get: function () {
            if (!this._audio)
                this._audio = new AudioManager();
            return this._audio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "user", {
        get: function () {
            if (!this._user)
                this._user = new UserManager();
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "config", {
        get: function () {
            if (!this._config)
                this._config = new ConfigManager();
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ENV", {
        /**
         * 当前环境
         * 1. 开发环境
         * 2. 发布环境
         *  */
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageSize", {
        /**
         * 舞台大小
         */
        get: function () {
            return {
                width: 640,
                height: 1136
            };
        },
        enumerable: true,
        configurable: true
    });
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map