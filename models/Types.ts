import {EmotionKey} from "@/models/consts/EmotionsConst";
import {Emotion} from "@/models/Emotion";
import {Control} from "react-hook-form";


export interface SerializedEmotion {
    _emotion: EmotionKey | null;
    _beforeIntensity: number;
    _afterIntensity: number;
}

export interface SerializedDistortionThought {
    _distortionThoughtId: string;
    _beforeIntensity: number;
    _afterIntensity: number;
}
export interface SerializedCounterConditioningThought {
    _counterThoughtId: string;
    _beforeIntensity: number;
    _afterIntensity: number;
}

export interface SerializedCase {
    id: number;
    caseDate: string;
    caseName: string | null;
    thought: string | null;
    emotions: SerializedEmotion[];
    behavior: string | null;
    symptoms: string | null;
    distortionThoughts: SerializedDistortionThought[];
    counterThoughts: SerializedCounterConditioningThought[];
}

export type CaseFormValues = {
    id: number;
    caseName: string;
    caseDate: Date;
    thought: string;
    emotions: Emotion[];
    behavior: string;
    symptoms: string;
    distortionThoughts: string[];
    counterThoughts: string[];
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
