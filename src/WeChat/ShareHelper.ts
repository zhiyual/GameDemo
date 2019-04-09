class ShareHelper {

    public static Share(obj: {rtMsg: ShareRtMsg, yes?: string, no?: string}) {
        return new Promise((resolve, reject)=>{
            WXHelper.instance.shareMsg(this.getShareObj())
            .then(()=>{
                resolve();
            })
            .catch(()=>{
                reject();
            })
        })
    }

    /**获取分享信息 */
    public static getShareObj(): ShareParam {
        // console.log(obj)
        // let title = this.handleMsg(obj.shareid, obj.area);
        // let imageUrl = App.config.shareCfg.getRandomImg(obj.shareid, obj.area);
        // let title = App.config.shareMsg;
        // let imageUrl = App.config.shareImg;

        let _info = App.config.shareInfo;

        let rsl: ShareParam = {
            title: _info.msg,
            imageUrl: _info.img
        }

        return rsl;
    }

    // private static handleMsg(shareid: number, area?: string) {
    //     let rsl = App.config.shareCfg.getRandomMsg(shareid, area);

    //     rsl = rsl.replace(/###/gi, App.play.score + "");
    //     rsl = rsl.replace(/\$\$\$/gi, App.user.nickName || "");

    //     return rsl;
    // }

    private static readonly OpenRtTime: number = 0;
    // SHIT
    /**是否打开分享提示 */
    private static get isOpenRtMsg(): boolean {
        let nt = new Date().getTime();
        return nt > ShareHelper.OpenRtTime;
    }


}


class SharePoint {
    /**微信右上角 */
    public static readonly share_p1: ShareRtMsg = {
        sure: ""
    }
    /**分享获得体力 */
    public static readonly share_p2 = {
        sure: "成功获得体力"
    }
    /**分享获得盾牌 */
    public static readonly share_p3 = {
        sure: "成功获得盾牌"
    }
    /**分享复活 */
    public static readonly share_p4 = {
        sure: "成功获得复活无敌"
    }
    /**排行榜界面 */
    public static readonly share_p5 = {
        sure: "分享成功"
    }

    /**获得金币 */
    public static readonly share_p6 = {
        sure: "成功获得金币"
    }
}

interface ShareRtMsg {
    sure: string;
    err?: string;
}

