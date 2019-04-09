var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigManager = (function () {
    function ConfigManager() {
        //============================================================
        this._shareInfo = {
            imgs: [
                "share_001.jpg",
                "share_002.jpg",
                "share_003.jpg",
            ],
            msg: [
                "这几个像素人，你选哪个？",
                "这像素迷宫你能穿越第几层？",
                "像素游戏，童年的回忆",
            ],
        };
    }
    Object.defineProperty(ConfigManager.prototype, "shareMsg", {
        /**随机一个分享文本 */
        get: function () {
            var l = this._shareInfo.msg.length;
            var k = Math.floor(Math.random() * l);
            return this._shareInfo.msg[k];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "shareImg", {
        /**随机一个分享图片 */
        get: function () {
            var l = this._shareInfo.imgs.length;
            var k = Math.floor(Math.random() * l);
            return "resource/assets/views/share/" + this._shareInfo.imgs[k];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "shareInfo", {
        /**随即一条分享信息 */
        get: function () {
            var l = this._shareInfo.msg.length;
            var k = Math.floor(Math.random() * l);
            return {
                msg: this._shareInfo.msg[k],
                img: "resource/assets/views/share/" + this._shareInfo.imgs[k],
            };
        },
        enumerable: true,
        configurable: true
    });
    return ConfigManager;
}());
__reflect(ConfigManager.prototype, "ConfigManager");
//# sourceMappingURL=ConfigManager.js.map