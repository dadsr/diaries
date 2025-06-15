import {EmotionKey} from "@/models/consts/EmotionsConst";
import {Emotion} from "@/models/Emotion";
import {DistortionsThoughtKey} from "@/models/consts/DistortionsThoughtsConst";
import {CounterThoughtKey} from "@/models/consts/CounterConditioningThoughtsConst";
import {Control} from "react-hook-form";


export interface SerializedEmotion {
    _emotion: EmotionKey | null;
    _beforeIntensity: number;
    _afterIntensity: number;
}

export interface SerializedDistortionThought {
    _distortion: DistortionsThoughtKey | null;
}
export interface SerializedCounterConditioningThought {
    _counterThought: CounterThoughtKey | null;
}

export interface SerializedCase {
    id: number;
    caseDate: string;
    caseName: string | null;
    thought: string | null;
    emotions: SerializedEmotion[];
    behavior: string | null;
    symptoms: string | null;
    distortionIds: string[];
    counterThoughtIds: string[];
}

export type CaseFormValues = {
    id: number;
    caseName: string;
    caseDate: Date;
    thought: string;
    emotions: Emotion[];
    behavior: string;
    symptoms: string;
    distortionIds: string[];
    counterThoughtIds: string[];
};

export interface EmotionOption {
    value: EmotionKey;
    label: string;
    beforeIntensity: number;
    afterIntensity: number;
}

export interface ThoughtItem {
    id: string;
    displayName: string;
    description: string;
}

export interface ModalProps  {
    diary: number;
    control: Control<CaseFormValues>;
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    options: ThoughtItem[];
}

export type BackButtonProps = {
    onPress: () => void;
};
