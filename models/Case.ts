import {Emotion} from "@/models/Emotion";
import {DistortionThought} from "@/models/DistortionThought";
import {CounterConditioningThought} from "@/models/CounterConditioningThought";


export class Case {
    id:number;
    caseDate:Date;
    caseName: string | null;
    thought: string | null;
    emotions: Emotion[];
    behavior: string | null;
    symptoms: string | null;
    distortions: DistortionThought[];
    counterThoughts: CounterConditioningThought[];


    constructor() {
        this.id = 0;
        this.caseDate = new Date();
        this.caseName = null;
        this.thought = null;
        this.emotions = [];
        this.behavior = null;
        this.symptoms = null;
        this.distortions = [];
        this.counterThoughts = [];
    }
}
