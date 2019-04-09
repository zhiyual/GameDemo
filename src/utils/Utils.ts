class Utils {
    /**
     * localStorage 写入
     */
    public static WriteLocalStorage(k: string, v: string): boolean {
        if (window.localStorage) {
            window.localStorage.setItem(k, v);
            return true;
        } else {
            console.log('浏览器不支持LocalStorage');
            return false;
        }
    }

    /**
     * localStorage 读取
     */
    public static ReadLocalStorage(k: string): string {
        if (window.localStorage) {
            return window.localStorage.getItem(k);
        } else {
            console.log('浏览器不支持LocalStorage');
            return null;
        }
    }

    /**
     * localStorage 删除
     */
    public static DeleteLocalStorage(k: string): boolean {
        if (window.localStorage) {
            window.localStorage.removeItem(k);
            return true;
        } else {
            console.log('浏览器不支持LocalStorage');
            return false;
        }
    }


    /**
     * 获取一个随机数
     */
    public static GetRandomNum(min: number, max: number): number {
        let k = max - min + 1;
        return Math.floor(Math.random() * k + min);
    }
    /**概率 百分比 */
    public static getProbability(num: number): boolean {
        return Math.random() > (1 - num);
    }

    /**log */
    public static log(...param) {
        switch (param.length) {
            case 1:
                console.log(param[0]);
                break;
            case 2:
                console.log(param[0], param[1]);
                break;
            case 3:
                console.log(param[0], param[1], param[2]);
                break;
            default:
                console.log(param);
        }
    }

    /**
     * 对比两个版本号
     * 格式 X.X.X
     * @param v1 版本号1
     * @param v2 版本号2
     * @return 0 版本相同
     * @return 1 版本1较大
     * @return -1 版本1较小
     */
    public static CompVersion(v1: string, v2: string): number {
        let arr1 = v1.split(".");
        let arr2 = v2.split(".");
        let nv1 = parseInt(arr1[0]) * 1000000 + parseInt(arr1[1]) * 1000 + parseInt(arr1[2]);
        let nv2 = parseInt(arr2[0]) * 1000000 + parseInt(arr2[1]) * 1000 + parseInt(arr2[2]);

        if (nv1 == nv2) return 0;
        if (nv1 > nv2) return 1;
        if (nv1 < nv2) return -1;
    }

    /**
     * 预设颜色值
     */
    public static readonly DefaultColor = {
        /**黑色 */
        black: 0x010101,
        /**黄色 */
        yellow: 0xfff600,
        /**紫色 */
        purple: 0xd600ff,
        /**红色 */
        red: 0xff0000,
        /**绿色 */
        green: 0x00ff00,
    }

    public static ToBoolean(a: any): boolean {
        let rsl: boolean = true;
        if (!a || a == 0 || a == "false") rsl = false;
        return a;
    }
    
    public static get isFullScreen(): boolean {
        let sw = window.screen.availWidth;
		let sh = window.screen.availHeight;

        return sh / sw > 16 / 9;
    }

    /**对比两个日期是否同一天 */
    public static CompareOneDay(t1: number, t2: number): boolean {
        let d1 = new Date(t1);
        let d2 = new Date(t2);
        return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
    }
}

class LocalStorage_Key {
    /**金币 */
    public static readonly GOLD = "gold";

    /**背包 */
    public static readonly BAG = "bag";

    /**使用的皮肤 */
    public static readonly UseSkin = "uskin";

    /**体力 */
    public static readonly Power = "power";
     
    /**最后一次体力变更 */
    public static readonly LastUpdatePower = "LU_power";

    /**关卡进度 */
    public static readonly Progress = "progress";

    /**分享获取体力记录 */
    public static readonly ShareRecord_1 = "sharerecord_1";

    /**满收集领取记录 */
    public static readonly RecordFC = "fc_rcd";

    /**分享获得盾牌记录 */
    public static readonly RecordSD = "sd_rcd";

    /**广告获得金币记录 */
    public static readonly RecordGD = "gd_rcd";

    /**广告次数记录 */
    public static readonly RecordAdNum = "adn_rcd";

    /**是否进去了关卡1 */
    public static readonly playerLevelOne = "playerLevelOne";
    /**是否进去了关卡2 */
    public static readonly playerLevelTwo = "playerLevelTwo";
}