class UserManager {
    // 玩家信息
    //============================================
    private _UserDB: UserInfoParams = {
        name: "",
        avater: "",
    };
    private openId:number;

    public get user_info(): UserInfoParams {
        return this._UserDB;
    }

    public get user_name(): string {
        return this._UserDB.name;
    }
    
    public get user_avater(): string {
        return this._UserDB.avater;
    }
    public get user_openid():number
    {
        return this.openId
    }
    public set user_openid(_user_openid)
    {
        this.openId = _user_openid
        console.log("this.openId",this.openId);
        
    }

    public isLogin: boolean = false;
    public InitUserInfo(info: UserInfoParams) {
        this._UserDB = info;
        this.isLogin = true;
    }

}

interface UserInfoParams {
    name: string;
    avater: string
}