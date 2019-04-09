class WXVideoAd {
    private static _instance: WXVideoAd;
    public static get instance(): WXVideoAd {
        if (!this._instance) this._instance = new WXVideoAd();
        return this._instance;
    }

    /**广告单元ID */
    private adUnitId: string = "adunit-6ccde69a23bb03d6";

    /**需要的微信SDK版本 */
    private needSDKVersion: string  = "2.0.4";

    /**判断基础库版本是否符合 */
    public isSDKVersionOK(): boolean {
        if (!WXHelper.isWxgame) return false;
        let stm = WXHelper.instance.getSystemInfoSync;
        let rsl = Utils.CompVersion(stm.SDKVersion, this.needSDKVersion);
        return rsl >= 0;
    }

    private _ad: VideoAd;

    private callBack: (res: {isEnded: boolean}) => void;
    private callBackObj: any;

    /**创建一个广告 */
    private createAd() {
        if (!this.isSDKVersionOK) return null;
        this._ad = wx.createRewardedVideoAd({adUnitId: this.adUnitId});
        if (!this.isListenLocalClose) {
            this._ad.onClose(this.OnAdClose);
            this.isListenLocalClose = true;
        }
    }

    // private _scb: Function;
    // private _ecb: Function;
    private isListenLocalClose: boolean = false;
    /**展示广告 */
    public LookAd(aid: string) {
        return new Promise((resolve, reject)=>{
            // this._scb = resolve;
            // this._ecb = reject;

            if (!this._ad || this.adUnitId != aid) {
                this.adUnitId = aid;
                this.createAd();

                

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

            if (!this._ad) {
                reject({errCode: 10001});
            }

            this._ad.onClose(res => {
                if (res && res.isEnded || res === undefined) {
                    // 完整播放，可以发奖励
                    resolve();
                    // this._scb && this._scb();
                } else {
                    // 不完整播放
                    reject({errCode: 10003});
                    // this._ecb && this._ecb({errCode: 10003});
                }
            })

            this._ad.onError(res => {
                reject({errCode: 10002});
                // this._ecb && this._ecb({errCode: 10002});
            })

            this._ad.show().catch(()=>{
                // this.loadAd();
                this._ad.load().then(()=>{
                    this._ad.show();
                })
            })

        }) 
    }

    private OnAdClose(res: any) {
        if (res && res.isEnded || res === undefined) {
            // 完整播放，做统计
            // Utils.UpdateVideoAdNum();
        }
    }

    private loadAd() {
        this._ad.load()
        .then(()=>{
            this._ad.show();
        })
        .catch(()=>{
            this.loadAd();
        })
    }

    private OnCloseAd() {
        this._ad.onClose(res => {
            if (res && res.isEnded || res === undefined) {
                // 完整播放，可以发奖励
            } else {
                // 不完整播放
            }
        })
    }
}

class VideoAd_AID {
    /**进入关卡界面----获得护盾 */
    public static aid1 = "adunit-6ccde69a23bb03d6"

    /**金币不足界面----获得金币 */
    public static aid2 = "adunit-abd35fda2e16a3ad"
}