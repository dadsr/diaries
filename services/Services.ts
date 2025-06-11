import { Platform } from "react-native";
import { Case } from "@/models/Case";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SerializedCase } from "@/models/Types";
import { Emotion } from "@/models/Emotion";

const isWeb = (Platform.OS === 'web');

export class Services {

    async getCases(diary: number): Promise<Case[]> {
        let storedCases: string | null;
        if (isWeb) {
            storedCases = localStorage.getItem('cases' + diary);
        } else {
            storedCases = await AsyncStorage.getItem('cases' + diary);
        }
        if (storedCases) {
            const parsed = JSON.parse(storedCases) as SerializedCase[];
            return parsed.map(caseItem => this.parseSerializedCase(caseItem));
        }
        return [];
    }

    async getCase(diary: number, id: number): Promise<Case | null> {
        const cases: Case[] = await this.getCases(diary);
        const index: number = cases.findIndex(c => c.id === id);
        if (index !== -1) {
            return cases[index];
        }
        return null;
    }

    async updateCase(diary: number, updatedCase: Case): Promise<void> {
        const cases: Case[] = await this.getCases(diary);
        const index = cases.findIndex(c => c.id === updatedCase.id);
        if (index !== -1) {
            const serializedCase: SerializedCase = this.serializeCase(updatedCase);
            const updatedCases = [...cases];
            updatedCases[index] = this.parseSerializedCase(serializedCase);
            if (isWeb) {
                localStorage.setItem('cases' + diary, JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
            } else {
                await AsyncStorage.setItem('cases' + diary, JSON.stringify(updatedCases.map(c => this.serializeCase(c))));
            }
        }
    }

    async addCase(diary: number, newCase: Case): Promise<void> {
        const cases: Case[] = await this.getCases(diary);
        if (cases.length > 0) {
            newCase.id = Math.max(...cases.map(c => c.id || 0)) + 1;
        } else {
            newCase.id = 1;
        }
        if (isWeb) {
            localStorage.setItem('cases' + diary, JSON.stringify([...cases, newCase].map(c => this.serializeCase(c))));
        } else {
            await AsyncStorage.setItem('cases' + diary, JSON.stringify([...cases, newCase].map(c => this.serializeCase(c))));
        }
    }

    async deleteCase(diary: number, caseId: number): Promise<void> {
        const cases: Case[] = await this.getCases(diary);
        const newCases = cases.filter(caseItem => caseItem.id !== caseId);
        if (isWeb) {
            localStorage.setItem('cases' + diary, JSON.stringify(newCases.map(c => this.serializeCase(c))));
        } else {
            await AsyncStorage.setItem('cases' + diary, JSON.stringify(newCases.map(c => this.serializeCase(c))));
        }
    }

    private parseSerializedCase(serialized: SerializedCase): Case {
        const caseInstance = new Case();
        caseInstance.id = serialized.id;
        caseInstance.caseDate = new Date(serialized.caseDate);
        caseInstance.caseName = serialized.caseName;
        caseInstance.thought = serialized.thought;
        caseInstance.emotions = serialized.emotions.map(e =>
            new Emotion(e._emotion, e._intensity)
        );
        caseInstance.behavior = serialized.behavior;
        caseInstance.symptoms = serialized.symptoms;
        caseInstance.distortionIds = serialized.distortionIds || [];
        caseInstance.counterThoughtIds = serialized.counterThoughtIds || [];
        return caseInstance;
    }

    private serializeCase(caseInstance: Case): SerializedCase {
        return {
            ...caseInstance,
            caseDate: caseInstance.caseDate.toISOString(),
            emotions: caseInstance.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity,
            })),
            distortionIds: caseInstance.distortionIds || [],
            counterThoughtIds: caseInstance.counterThoughtIds || [],
        };
    }
}

const services = new Services();
export default services;
