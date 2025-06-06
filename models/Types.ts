import {EmotionKey} from "@/models/consts/EmotionsConst";
import {Emotion} from "@/models/Emotion";
import {DistortionThought} from "@/models/DistortionThought";
import {CounterConditioningThought} from "@/models/CounterConditioningThought";
import {DistortionsThoughtKey} from "@/models/consts/DistortionsThoughtsConst";
import {CounterThoughtKey} from "@/models/consts/CounterConditioningThoughtsConst";
import {Control} from "react-hook-form";



export interface SerializedEmotion {
    _emotion: EmotionKey | null;
    _intensity: number;
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
    distortions: SerializedDistortionThought[];
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
    distortions: DistortionThought[];
    counterThoughts: CounterConditioningThought[];
};

export interface EmotionOption {
    value: EmotionKey;
    label: string;
    intensity: number;
}

export interface ThoughtItem {
    id: string;
    displayName: string;
    description: string;
}

export interface ModalProps  {
    control: Control<CaseFormValues>;
    visible: boolean;
    onClose: () => void;
    onSave: (selectedIds: string[]) => void;
    options: ThoughtItem[];
    diary: number;
}

export type BackButtonProps = {
    onPress: () => void;
};
