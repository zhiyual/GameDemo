declare namespace wx{
    const getSystemInfoSync: () => WxSystemInfo;
    const showToast: (obj: {title: string, icon?, image?})=>void;
    const exitMiniProgram: ()=>void;
    const getUserInfo: (obj: {success: (res: {errMsg: string, userInfo: WXUserInfo})=>void, fail: (res)=>void})=>void;
    const createUserInfoButton: (obj: UserInfoBtnParam)=> UserInfoBtn;
    const getOpenDataContext: ()=> OpenDataContext;
    const shareAppMessage: (obj: ShareParam)=>void;
    const onShow: (cb: (res: onshow_cb_res)=>void)=>void;
    const offShow: (cb: ()=>void)=>void;

    type onshow_cb_res = {
        scene?: string,
        query?: any,
        shareTicket?: string,
        referrerInfo?: referrerInfo
    }

    type referrerInfo = {
        appId?: string,
        extraData?: any,
    }

    const onHide: (cb: ()=>void)=>void;

    const setUserCloudStorage: (obj: {KVDataList: KVData[], success?: (res)=>void, fail?: ()=>void, complete?: ()=>void})=>void;

    const showShareMenu: (obj?: {withShareTicket?: boolean})=>void;
    /**点击右上角分享 */
    const onShareAppMessage: (cb: ()=>ShareParam)=>void;

    const createGameClubButton: (obj: clubBtnParam)=>GameClubButton;

    type clubBtnParam = {
        type?: string,
        text?: string,
        image?: string,
        style: clubBtnStyle,
        icon: string
    }

    type clubBtnStyle = {
        left: number,
        top: number,
        width: number,
        height: number
    }

    //===================================
    //BannerAD
    //===================================
    /**创建 banner 广告组件 */
    const createBannerAd: (obj: BannerAdParam) => BannerAd;

    //===================================
    //VideoAD
    //===================================
    /**创建激励视频广告组件 */
    const createRewardedVideoAd: (obj: {adUnitId: string}) => VideoAd;
}



//===============================================================================================

interface WxSystemInfo {
    model: string,
    SDKVersion: string,
    screenWidth: number,
    screenHeight: number
}

interface UserInfoBtnParam{
    type: string,
    text?: string,
    image?: string,
    style: {left: number, top: number, width: number, height: number, backgroundColor: string, borderColor: string,
        borderWidth: number, borderRadius: number, textAlign: string, fontSize: number, lineHeight: number},
    withCredentials: boolean
}

interface UserInfoBtn{
    show(): void;
    hide(): void;
    destroy(): void;
    onTap(cb: (res: {errMsg: string, userInfo?: WXUserInfo})=>void): void;
    offTap(cb: Function): void;
}

interface WXUserInfo {
    avatarUrl: string;
    city: string;
    country: string;
    gender: number;
    language: string;
    nickName: string;
    province: string;
}

interface OpenDataContext {
    postMessage(obj: {[index: string]: any}): void;
}

interface KVData {
    key: string,
    value: string
}

interface ShareParam {
    title: string,
    imageUrl: string,
    query?: string
}

interface GameClubButton {
    show(): void;
    hide(): void;
    destroy(): void;
    onTap(cb: ()=>void): void;
    offTap(cb: ()=>void): void;
}

/**Banner Ad Params */
interface BannerAdParam {
    adUnitId: string,
    style: {
        left: number,
        top: number,
        width: number,
        height?: number
    }
}

/**Banner Ad Class */
interface BannerAd {
    style: {
        left: number,
        top: number,
        width: number,
        height: number,
        realWidth: number,
        realHeight: number
    };
    show(): Promise<any>; 
    hide(): void;
    destroy(): void;
    onResize(cb: (res: {width: number, height: number})=>void): void;
    offResize(cb: ()=>void): void;
    onLoad(cb: ()=>void): void;
    offLoad(cb: ()=>void): void;
    onError(cb: (res: {errMsg: string, errCode: number})=>void): void;
    offError(cb: ()=>void): void;
}

/**Video Ad Class */
interface VideoAd {
    load(): Promise<any>;
    show(): Promise<any>;
    onLoad(cb: ()=>void): void;
    offLoad(cb: ()=>void): void;
    onError(cb: (res: {errMsg: string, errCode: number})=>void): void;
    offError(cb: ()=>void): void;
    onClose(cb: (res?: {isEnded: boolean})=>void): void;
    offClose(cb: Function): void;
}