class UIBase extends eui.Component{

    /**无视比例，充满屏幕 */
    public static readonly Adapt1 = 1;
    /**保持比例，缩放至显示全部内容 */
    public static readonly Adapt2 = 2;

    public constructor () {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.OnOpen, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.OnClose, this);
    }

    protected Params: any;
    protected content: eui.Group;
    protected topBar: eui.Group;
    private stripe: eui.Image;
    protected AdaptType: number = UIBase.Adapt2;
    protected tap_mask: eui.Rect;
    
    /**是否处于打开状态 */
    public isOpened: boolean;

    public isOpenMovie: boolean = false;
    public isFlashBg: boolean = false;

    private flashbg_Timer: egret.Timer;

    protected OnOpen() {
        this.AdaptScreen();
        this.isOpened = true;
        this.tap_mask && this.tap_mask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTapMask, this);
        // this.AdaptIphoneX();
        this.AdaptFullScreen();
        this.OpenMovies();
        this.FlashStripeBg();
    }

    protected OnClose() {
        this.isOpened = false;

        this.flashbg_Timer && this.flashbg_Timer.stop();
    }


    /**
     * 打开面板
     */
    public Open(layer: egret.DisplayObjectContainer = App.layer.playLayer, ...Params) {
        let stage = layer || App.layer.playLayer;
        
        switch (stage) {
            case App.layer.playLayer:
                this.OpenInPlayLayer();
                break;
            case App.layer.tipLayer:
                this.OpenInOtherLayer(stage);
                break;
            default :
                stage.addChild(this);
                break;
        }
    }

    private OpenInPlayLayer() {
        if (App.layer.playLayer.numChildren > 0) App.layer.playLayer.removeChildren();
        App.layer.playLayer.addChild(this);
    }

    private OpenInOtherLayer(stage: egret.DisplayObjectContainer) {
        let c = stage.numChildren;
        for (let i=0;i<c;i++) {
            stage.getChildAt(i).visible = false;
        }
        stage.addChild(this);
    }

    /**
     * 关闭面板
     */
    public Close() {
        if (!this.parent || !this) return;
        let stage = this.parent;
        stage.removeChild(this);
        switch (stage) {
            case App.layer.tipLayer:
                this.CloseFromOtherLayer(stage);
                break;
        }
    }

    private CloseFromOtherLayer(stage: egret.DisplayObjectContainer) {
        let l = stage.numChildren;
        if (l > 0) {
            stage.getChildAt(l - 1).visible = true;
        }
    }

    /**
     * 全面屏适应
     */
    protected AdaptScreen() {
        if (!this.content) return;
		let sw = window.screen.availWidth;
		let sh = window.screen.availHeight;

        if (sh < sw) {
            let idx = sw;
            sw = sh;
            sh = idx;
        }

        let gameW = App.StageSize.width;
        let gameH = App.StageSize.height;

		let scale_s = Math.floor(sw/sh*100);
		let scale_c = Math.floor(gameW/gameH*100);
		
		this.content.anchorOffsetX = this.content.width/2;
		this.content.anchorOffsetY = this.content.height/2;
		if (scale_s < scale_c) {
            // 竖屏
			let cw = sw / sh * gameH;
			this.content.scaleX = this.content.scaleY = cw/gameW;
            if (this.AdaptType == 1) this.content.height = gameW * (sh / sw);
		}

		if (scale_s > scale_c) {
            // 横屏
			let ch = sh / sw * gameW;
			this.content.scaleX = this.content.scaleY = ch/gameH;
            if (this.AdaptType == 1) this.content.width = gameH * (sw / sh);
		}
	}

    /**点击半透黑 */
    protected OnTapMask() {
        this.Close();
    }

    /**适配IPhone X 系列 */
    private AdaptIphoneX() {
        if (this.AdaptType == UIBase.Adapt2) return;
        if (!WXHelper.isWxgame) return;
        if (!this.topBar) return;

        this.topBar.top = WXHelper.instance.isIPhoneX? 55 : 0;
    }

    /**
     * 只要全面屏就往下挪
     * FUCK
     */
    private AdaptFullScreen() {
        if (this.AdaptType == UIBase.Adapt2) return;
        if (!WXHelper.isWxgame) return;
        if (!this.topBar) return;

        this.topBar.top = Utils.isFullScreen? 55 : 0;
    }

    /**打开动画 */
    private OpenMovies() {
        if (!this.isOpenMovie) return;
        let sca = this.content.scaleX;
        this.content.scaleX = this.content.scaleY = sca / 2;
        egret.Tween.get(this.content)
        .to({scaleX: sca, scaleY: sca}, 100)
    }

    /**闪动条纹背景 */
    private FlashStripeBg() {
        if (!this.isFlashBg) return;
        if (!this.stripe) return;

        if (!this.flashbg_Timer) {
            this.flashbg_Timer = new egret.Timer(200, 0);
            this.flashbg_Timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
                this.stripe.verticalCenter = this.stripe.verticalCenter==0? 8 : 0;
            }, this)
        }

        this.flashbg_Timer.reset();
        this.flashbg_Timer.start();
    }

    
}