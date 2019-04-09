class ConfigManager {
    //============================================================
    private _shareInfo: { imgs: string[], msg: string[] } = {
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
    }



    /**随机一个分享文本 */
    public get shareMsg(): string {
        let l = this._shareInfo.msg.length;
        let k = Math.floor(Math.random() * l);
        return this._shareInfo.msg[k];
    }
    /**随机一个分享图片 */
    public get shareImg(): string {
        let l = this._shareInfo.imgs.length;
        let k = Math.floor(Math.random() * l);
        return "resource/assets/views/share/" + this._shareInfo.imgs[k];
    }

    /**随即一条分享信息 */
    public get shareInfo(): {msg: string, img: string} {
        let l = this._shareInfo.msg.length;
        let k = Math.floor(Math.random() * l);
        return {
            msg: this._shareInfo.msg[k],
            img: "resource/assets/views/share/" + this._shareInfo.imgs[k],
        }
    }
}