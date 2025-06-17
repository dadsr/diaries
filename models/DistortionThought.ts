
export class DistortionThought {
    private _distortionThoughtId: string;
    private _beforeIntensity: number;
    private _afterIntensity: number;


    constructor(distortionThoughtId: string, beforeIntensity: number, afterIntensity: number) {
        this._distortionThoughtId = distortionThoughtId;
        this._beforeIntensity = beforeIntensity;
        this._afterIntensity = afterIntensity;
    }


    get distortionThoughtId(): string {
        return this._distortionThoughtId;
    }

    set distortionThoughtId(value: string) {
        this._distortionThoughtId = value;
    }

    get beforeIntensity(): number {
        return this._beforeIntensity;
    }

    set beforeIntensity(value: number) {
        this._beforeIntensity = value;
    }

    get afterIntensity(): number {
        return this._afterIntensity;
    }

    set afterIntensity(value: number) {
        this._afterIntensity = value;
    }
}
