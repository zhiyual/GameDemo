class LayerManager {
    public Excs: number[] = [0, 0];
    public GlobalScale: number = 1;

    private _stage: egret.DisplayObjectContainer;

    private _playLayer: egret.DisplayObjectContainer;
    private _tipLayer: egret.DisplayObjectContainer;
    private _loadingLayer: egret.DisplayObjectContainer;

   


    public InitLayer(stage: egret.DisplayObjectContainer) {
        this._stage = new egret.DisplayObjectContainer();
        stage.addChild(this._stage);
        this.AdapterWindow();

        this._playLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._playLayer);

        this._tipLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._tipLayer);

        this._loadingLayer = new egret.DisplayObjectContainer();
        this._stage.addChild(this._loadingLayer);
    }

    private AdapterWindow() {
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



		if (scale_s < scale_c) {
			// 全面屏
            let x = sw / sh * gameH;
            this._stage.x += (x - gameW) / 2;
            console.log("全面",x)
            this.Excs = [(x - gameW) / 2, 0];
            this.GlobalScale = x / gameW;
		}

		if (scale_s > scale_c) {
			// paid屏
            let y = sh / sw * gameW;
            this._stage.y += (y - gameH) / 2;
            console.log("ipad",y)
            this.Excs = [0, (y - gameH) / 2];
            this.GlobalScale = y / gameH;
		}
    }

    public get playLayer(): egret.DisplayObjectContainer{
        if (!this._playLayer) this.InitLayer(App.gameStage);
        return this._playLayer;
    }

    public get tipLayer(): egret.DisplayObjectContainer{
        if (!this._tipLayer) this.InitLayer(App.gameStage);
        return this._tipLayer;
    }

    public get loadingLayer(): egret.DisplayObjectContainer{
        if (!this._loadingLayer) this.InitLayer(App.gameStage);
        return this._loadingLayer;
    }

    public get stage(): egret.DisplayObjectContainer{
        if (!this._stage) this.InitLayer(App.gameStage);
        return this._stage;
    }

}