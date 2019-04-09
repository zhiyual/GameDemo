class Platfrom_WX implements Platform {
    name = 'wxgame';

    async getUserInfo() {
        return App.user.user_info;
    }

    async login() {
        return new Promise((resolve, reject)=>{
            WXHelper.instance.getUserInfo()
            .then((res: WXUserInfo)=>{
                this.InitUserData(res);
                resolve();
            })
            .catch(()=>{
                WXHelper.instance.getUserInfoBtn.show();
                WXHelper.instance.getUserInfoBtn.onTap(res=>{
                    if (res.errMsg == "getUserInfo:ok") {
                        WXHelper.instance.getUserInfoBtn.hide();
                        this.InitUserData(res.userInfo);
                        resolve();
                    }
                });
            })
        })
    }

    private InitUserData (db: WXUserInfo) {
        App.user.InitUserInfo({
            name: db.nickName,
            avater: db.avatarUrl
        });
    }
    
}

// if (WXHelper.isWxgame) {
//     window.platform = new Platfrom_WX();
// }