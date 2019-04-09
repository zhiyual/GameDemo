class WXHelper {
    private static _instance: WXHelper;
    public static get instance(): WXHelper{
        if (!this._instance) this._instance = new WXHelper();
        return this._instance;
    }

    /**
     * 检测是否微信环境
     */
    public static get isWxgame(): boolean{
        return platform['name'] && platform['name'] == 'wxgame';
    }

    private _systemInfo: WxSystemInfo;
    /**
     * 获取设备信息
     */
    public get getSystemInfoSync(): WxSystemInfo {
        if (!this._systemInfo) this._systemInfo = wx.getSystemInfoSync();
        return this._systemInfo;
    }

    /**
     * 弹出提示框
     */
    public showToast(title: string, icon: string) {
        wx.showToast({
            title: title,
            icon: icon
        })
    }

    /**
     * 退出小游戏
     */
    public exitMiniProgram() {
        wx.exitMiniProgram();
    }

    /**
     * 获取用户信息
     */
    public getUserInfo() {
        let __this = this;
        return new Promise((resolve, reject)=>{
            wx.getUserInfo({
                success(res) {
                    resolve(res.userInfo);
                },
                fail(res) {
                    reject(res);
                }
            })
        });
    }

    /**
     * 创建获取用户信息按钮
     */
    private createUserInfoBtn(): UserInfoBtn {
        let scw = window.screen.availWidth;
        let sch = window.screen.availHeight;
        let btn_w = scw * 0.4625;
        let btn_h = btn_w * 0.3243;
        return wx.createUserInfoButton({
            type: 'image',
            image: "resource/assets/views/big/ld_btn_ksyx.png",
            style: {
                left: (scw - btn_w) / 2,
                top: sch * 0.7764,
                width: btn_w,
                height: btn_h,
                backgroundColor: '#ccc000',
                borderColor: '#000000',
                borderWidth: 0,
                borderRadius: 0,
                textAlign: 'center',
                fontSize: 30,
                lineHeight: 40,
            },
            withCredentials: false,
        })
    }

    private _getUserInfoBtn: UserInfoBtn;
    
    /**
     * 获取用户信息授权按钮
     */
    public get getUserInfoBtn(): UserInfoBtn {
        if (!this._getUserInfoBtn) this._getUserInfoBtn = this.createUserInfoBtn();
        return this._getUserInfoBtn;
    }


    /**
     * 获取数据开放域
     */
    private _openDataContext: OpenDataContext;
    public get WX_OpenDataContext(): OpenDataContext{
        if (!this._openDataContext) this._openDataContext = wx.getOpenDataContext();
        return this._openDataContext;
    }


    /**
     * 主动吊起分享
     */
    public shareMsg(obj: ShareParam) {
        return new Promise((resolve, reject)=>{
            let sd = new Date().getTime();
            let params = {
                title: obj.title,
                imageUrl: obj.imageUrl || "aa.png",
                query: obj.query || "action=share"
            }
            console.log('shareInfo:', params);
            wx.shareAppMessage(params);

            function callback() {
                let ed = new Date().getTime();
                if (ed - sd >= 2500) {
                    resolve();
                } else {
                    reject();
                }

                wx.offShow(callback);
            }

            wx.onShow(callback);
        })
    }

    /**
     * 主动托管用户数据
     */
    public setUserCloudStorage(score: number, lv: number) {
        WXHelper.instance.WX_OpenDataContext.postMessage({
            'command': "updateScore",
            'score': score,
            'lv': lv
        })
    }


    private _clubBtn: GameClubButton;

    /**
     * 获取游戏圈按钮
     */
    public get clubBtn(): GameClubButton{
        if (!this._clubBtn) {
            let scw = window.screen.availWidth;
            let sch = window.screen.availHeight;
            let phone_model = WXHelper.instance.getSystemInfoSync.model;
            this._clubBtn = wx.createGameClubButton({
                icon: "white",
                style: {
                    left: scw * 0.8 - 40,
                    top: Utils.isFullScreen? 44+70 : 4+70,
                    width: 40,
                    height: 40,
                }
            })
        }

        return this._clubBtn;
    }


    /**是否是 IPhnoe X 系列 */
    public get isIPhoneX(): boolean {
        let phone_model = WXHelper.instance.getSystemInfoSync.model;
        return phone_model.indexOf("iPhone X") != -1;
    }
    
}