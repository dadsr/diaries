
export class CounterThought {
    private _counterThoughtId: string;
    private _beforeIntensity: number;
    private _afterIntensity: number;


    constructor(counterThoughtId: string, beforeIntensity: number, afterIntensity: number) {
        this._counterThoughtId = counterThoughtId;
        this._beforeIntensity = beforeIntensity;
        this._afterIntensity = afterIntensity;
    }


    get distortionThoughtId(): string {
        return this._counterThoughtId;
    }

    set distortionThoughtId(value: string) {
        this._counterThoughtId = value;
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
