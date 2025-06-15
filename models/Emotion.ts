import {EmotionKey, EmotionsConst} from "@/models/consts/EmotionsConst";

export class Emotion {
    private _emotion: EmotionKey | null;
    private _beforeIntensity: number;
    private _afterIntensity: number;


    constructor(emotionType: EmotionKey | null = null, beforeIntensity: number = 0, afterIntensity: number = 0) {
        this._emotion = emotionType;
        this._beforeIntensity = beforeIntensity;
        this._afterIntensity = afterIntensity;
    }

    toJSON() {
        return {
            _emotion: this._emotion,
            _intensity: this._beforeIntensity,
            _afterIntensity: this._afterIntensity,
        };
    }

    get getEmotion(): EmotionKey | null {
        return this._emotion;
    }

    set setEmotion(emotionType: EmotionKey | null) {
        this._emotion = emotionType;
    }
    get getBeforeIntensity(): number {
        return this._beforeIntensity;
    }
    get getAfterIntensity(): number {
        return this._afterIntensity;
    }

    set setBeforeIntensity(beforeIntensity: number) {
        this._beforeIntensity = beforeIntensity;
    }

    set setAfterIntensity(afterIntensity: number) {
        this._afterIntensity = afterIntensity;
    }


    get displayName(): string {
        if (!this._emotion) return 'Unknown Emotion';
        return EmotionsConst[this._emotion]?.displayName || this._emotion;
    }

}
