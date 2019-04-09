class App {
    public static gameStage: egret.DisplayObjectContainer;

    private static _layer: LayerManager;
    public static get layer(): LayerManager{
        if (!this._layer) this._layer = new LayerManager();
        return this._layer;
    }

    private static _panel: PanelManager;
    public static get panel(): PanelManager{
        if (!this._panel) this._panel = new PanelManager();
        return this._panel;
    }

    // private static _play: PlayManager;
    // public static get play(): PlayManager{
    //     if (!this._play) this._play = new PlayManager();
    //     return this._play;
    // }

    private static _event: EventManager;
    public static get event(): EventManager{
        if (!this._event) this._event = new EventManager();
        return this._event;
    }

    private static _audio: AudioManager;
    public static get audio(): AudioManager{
        if (!this._audio) this._audio = new AudioManager();
        return this._audio;
    }

    private static _user: UserManager;
    public static get user(): UserManager{
        if (!this._user) this._user = new UserManager();
        return this._user;
    }

    private static _config: ConfigManager;
    public static get config(): ConfigManager{
        if (!this._config) this._config = new ConfigManager();
        return this._config;
    }

    /**
     * 当前环境
     * 1. 开发环境
     * 2. 发布环境
     *  */
    public static get ENV(): number {
        return 2;
    }

    /**
     * 舞台大小
     */
    public static get StageSize() {
        return {
            width: 640,
            height: 1136
        }
    }

    /**
     * 是否要显示获取授权按钮
     */
    // public static WXShowGetUserinfoBtn() {
    //     let cn1: number = App.layer.loadingLayer.numChildren;
    //     let cn2: number = App.layer.tipLayer.numChildren;
    //     if (WXHelper.isWxgame && !App.user.isLogin && (cn1 == 0 || cn2 == 0)) {
    //         WXHelper.instance.getUserInfoBtn.show();
    //     }
    // }
}