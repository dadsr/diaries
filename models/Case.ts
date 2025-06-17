import {Emotion} from "@/models/Emotion";


export class Case {
    id:number;
    caseDate:Date;
    caseName: string | null;
    thought: string | null;
    emotions: Emotion[];
    behavior: string | null;
    symptoms: string | null;
    distortionIds: string[];
    counterThoughtIds: string[];


    constructor() {
        this.id = 0;
        this.caseDate = new Date();
        this.caseName = null;
        this.thought = null;
        this.emotions = [];
        this.behavior = null;
        this.symptoms = null;
        this.distortionIds = [];
        this.counterThoughtIds = [];
    }
}
