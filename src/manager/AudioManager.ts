class AudioManager {
    private _BGM_Volume: number = 50;
    /**获取背景音量 */
    public get BGM_Volume(): number {
        return this._BGM_Volume;
    }

    /**设置背景音量 */
    public set BGM_Volume(v: number) {
        this._BGM_Volume = v;
        if (this._sounds[SoundName.BGM]) {
            this._sounds[SoundName.BGM].setvolume(this.BGM_Volume)
        }
    }

    private _GAME_Volume: number = 50;
    /**获取游戏音量 */
    public get GAME_Volume(): number {
        return this._GAME_Volume;
    }
    /**设置游戏音量 */
    public set GAME_Volume(v: number) {
        this._GAME_Volume = v;
        for (let p in this._sounds) {
            if (p != SoundName.BGM) {
                this._sounds[p].setvolume(this._GAME_Volume);
            }
        }
    }


    /**进入后台，全体暂停 */
    public OnAppPause() {
        for (let p in this._sounds) {
            // this._sounds[p].setvolume(0);
            this._sounds[p].OnPause();
        }
    }
    /**返回前台，正常播放 */
    public OnAppResume() {
        for (let p in this._sounds) {
            this._sounds[p].OnResume();
            // if (p != SoundName.BGM) {
            //     this._sounds[p].setvolume(this._GAME_Volume);
            // } else {
            //     this._sounds[p].setvolume(this.BGM_Volume);
            // }
        }
    }

    //======================================================================================
    private _sounds: {[index: string]: AudioItem} = {};

    public initSounds() {
        let all = SoundName.AllAudios;
        all.forEach((v)=>{
            this._sounds[v] = new AudioItem(v);
        })
        // this._sounds[SoundName.BGM] = new AudioItem(SoundName.BGM);


        //=============================
        this.BGM_Volume = 100;
        this.GAME_Volume = 100;
    }

    public Play(name: string, start: number = 0, loop: number = 1) {
        if (!this._sounds[name]) return;
        this._sounds[name].play(start, loop);
    }

    public Stop(name: string) {
        if (!this._sounds[name]) return;
        this._sounds[name].stop();
    }

    public SetVolume(name: string, vol: number) {
        if (!this._sounds[name]) return;
        this._sounds[name].setvolume(vol);
    }
    
}

class AudioItem {
    public constructor(name: string) {
        this.sound = RES.getRes(name);
        this.soundChannel = null;
    }

    public isPlaying: boolean = false;
    public vol: number = 100;
    public sound: egret.Sound;
    public soundChannel: egret.SoundChannel;
    
    private loop: number;
    private pos: number;

    public play(start: number, loop: number) {
        if (this.isPlaying) {
            // this.stop();
        }
        this.isPlaying = true;
        this.soundChannel = this.sound.play(start, loop);
        this.loop = loop;
        this.soundChannel.volume = this.vol / 100;
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, ()=>{
            this.isPlaying = false;
        }, this);
    }

    public stop() {
        if (!this.isPlaying || !this.soundChannel) return;
        this.soundChannel.stop();
        this.isPlaying = false;
    }

    public setvolume(vol: number) {
        if (vol < 0) vol = 0;
        if (vol > 100) vol = 100;
        this.vol = vol;
        if (!this.isPlaying || !this.soundChannel) return;
        this.soundChannel.volume = this.vol / 100;
    }

    public OnPause() {
        if (!this.isPlaying) return;
        this.pos = this.soundChannel.position;
        this.soundChannel.stop();
    }

    public OnResume() {
        if (!this.isPlaying) return;
        this.soundChannel = this.sound.play(this.pos, this.loop);
        this.soundChannel.volume = this.vol / 100;
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, ()=>{
            this.isPlaying = false;
        }, this);
    }
}

class SoundName {
    /**获取所有配置的音效，用于初始化 */
    public static get AllAudios(): string[] {
        return [
            this.roleMove,
            this.eatStar,
            this.gameWin,
            this.gameDead,
            this.heroRevive,
            this.stabProp,
            this.btnMove

            // this.BGM,
            // this.Button,
            // this.Stick,
            // this.GameOver,
            // this.Match,
            // this.Down,
            // this.Cool,
            // this.Good,
            // this.Great,
            // this.Perfect,
        ];
    }

    /**BGM */
    public static BGM = "temp_bgm_6_mp3";
    // public static gameStart = "gameStart_mp3"
    public static roleMove="roleMove_mp3"
    public static eatStar="eatStar_mp3"
    public static gameWin="win_mp3"
    public static gameDead="dead_mp3"
    public static heroRevive="herorevive_mp3"
    public static stabProp="stabProp_mp3"
    public static btnMove="btnMove_mp3"



}