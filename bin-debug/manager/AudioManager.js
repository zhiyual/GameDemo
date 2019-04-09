var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AudioManager = (function () {
    function AudioManager() {
        this._BGM_Volume = 50;
        this._GAME_Volume = 50;
        //======================================================================================
        this._sounds = {};
    }
    Object.defineProperty(AudioManager.prototype, "BGM_Volume", {
        /**获取背景音量 */
        get: function () {
            return this._BGM_Volume;
        },
        /**设置背景音量 */
        set: function (v) {
            this._BGM_Volume = v;
            if (this._sounds[SoundName.BGM]) {
                this._sounds[SoundName.BGM].setvolume(this.BGM_Volume);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AudioManager.prototype, "GAME_Volume", {
        /**获取游戏音量 */
        get: function () {
            return this._GAME_Volume;
        },
        /**设置游戏音量 */
        set: function (v) {
            this._GAME_Volume = v;
            for (var p in this._sounds) {
                if (p != SoundName.BGM) {
                    this._sounds[p].setvolume(this._GAME_Volume);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**进入后台，全体暂停 */
    AudioManager.prototype.OnAppPause = function () {
        for (var p in this._sounds) {
            // this._sounds[p].setvolume(0);
            this._sounds[p].OnPause();
        }
    };
    /**返回前台，正常播放 */
    AudioManager.prototype.OnAppResume = function () {
        for (var p in this._sounds) {
            this._sounds[p].OnResume();
            // if (p != SoundName.BGM) {
            //     this._sounds[p].setvolume(this._GAME_Volume);
            // } else {
            //     this._sounds[p].setvolume(this.BGM_Volume);
            // }
        }
    };
    AudioManager.prototype.initSounds = function () {
        var _this = this;
        var all = SoundName.AllAudios;
        all.forEach(function (v) {
            _this._sounds[v] = new AudioItem(v);
        });
        // this._sounds[SoundName.BGM] = new AudioItem(SoundName.BGM);
        //=============================
        this.BGM_Volume = 100;
        this.GAME_Volume = 100;
    };
    AudioManager.prototype.Play = function (name, start, loop) {
        if (start === void 0) { start = 0; }
        if (loop === void 0) { loop = 1; }
        if (!this._sounds[name])
            return;
        this._sounds[name].play(start, loop);
    };
    AudioManager.prototype.Stop = function (name) {
        if (!this._sounds[name])
            return;
        this._sounds[name].stop();
    };
    AudioManager.prototype.SetVolume = function (name, vol) {
        if (!this._sounds[name])
            return;
        this._sounds[name].setvolume(vol);
    };
    return AudioManager;
}());
__reflect(AudioManager.prototype, "AudioManager");
var AudioItem = (function () {
    function AudioItem(name) {
        this.isPlaying = false;
        this.vol = 100;
        this.sound = RES.getRes(name);
        this.soundChannel = null;
    }
    AudioItem.prototype.play = function (start, loop) {
        var _this = this;
        if (this.isPlaying) {
            // this.stop();
        }
        this.isPlaying = true;
        this.soundChannel = this.sound.play(start, loop);
        this.loop = loop;
        this.soundChannel.volume = this.vol / 100;
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            _this.isPlaying = false;
        }, this);
    };
    AudioItem.prototype.stop = function () {
        if (!this.isPlaying || !this.soundChannel)
            return;
        this.soundChannel.stop();
        this.isPlaying = false;
    };
    AudioItem.prototype.setvolume = function (vol) {
        if (vol < 0)
            vol = 0;
        if (vol > 100)
            vol = 100;
        this.vol = vol;
        if (!this.isPlaying || !this.soundChannel)
            return;
        this.soundChannel.volume = this.vol / 100;
    };
    AudioItem.prototype.OnPause = function () {
        if (!this.isPlaying)
            return;
        this.pos = this.soundChannel.position;
        this.soundChannel.stop();
    };
    AudioItem.prototype.OnResume = function () {
        var _this = this;
        if (!this.isPlaying)
            return;
        this.soundChannel = this.sound.play(this.pos, this.loop);
        this.soundChannel.volume = this.vol / 100;
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            _this.isPlaying = false;
        }, this);
    };
    return AudioItem;
}());
__reflect(AudioItem.prototype, "AudioItem");
var SoundName = (function () {
    function SoundName() {
    }
    Object.defineProperty(SoundName, "AllAudios", {
        /**获取所有配置的音效，用于初始化 */
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    /**BGM */
    SoundName.BGM = "temp_bgm_6_mp3";
    // public static gameStart = "gameStart_mp3"
    SoundName.roleMove = "roleMove_mp3";
    SoundName.eatStar = "eatStar_mp3";
    SoundName.gameWin = "win_mp3";
    SoundName.gameDead = "dead_mp3";
    SoundName.heroRevive = "herorevive_mp3";
    SoundName.stabProp = "stabProp_mp3";
    SoundName.btnMove = "btnMove_mp3";
    return SoundName;
}());
__reflect(SoundName.prototype, "SoundName");
//# sourceMappingURL=AudioManager.js.map