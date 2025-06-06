import { Control, Controller } from "react-hook-form";
import { CaseFormValues, EmotionOption } from "@/models/Types";
import React, {JSX} from "react";
import { Emotion } from "@/models/Emotion";
import { EmotionKey, EmotionsConst } from "@/models/consts/EmotionsConst";
import { Platform, Text, View } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import { MultiSelect } from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";


interface SelectorProps {
    name: "emotions";
    diary: number;
    control: Control<CaseFormValues>;
}

export function EmotionsMultiSelector({ name, diary, control }: SelectorProps): JSX.Element {

    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        intensity: 50,
    }));
    // Function to render slider markings
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View
                    key={`mark-${i}`}
                    style={[globalStyles.sliderMark, { left: `${i}%` }]}
                >
                    <View style={globalStyles.markLine} />
                </View>
            );
        }
        return markings;
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>רגשות:</Text>
            <Controller
                name = {name}
                control = {control}
                render = {({ field }) => {
                    const selectValue: EmotionOption[] = Array.isArray(field.value)
                        ? field.value
                            .filter((emotion: Emotion) => emotion.getEmotion !== null && emotion.getEmotion !== undefined)
                            .map((emotion: Emotion) => ({
                                value: emotion.getEmotion as EmotionKey,
                                label: EmotionsConst[emotion.getEmotion as EmotionKey].displayName,
                                intensity: emotion.getIntensity,
                            }))
                        : [];

                    // Array of selected values for MultiSelect
                    const selectedValues = selectValue.map(option => option.value);

                    const onChange =(selectedItems: EmotionKey[]) => {
                        const emotions = selectedItems.map((item) => {
                            const existing = selectValue.find(option => option.value === item);
                            return new Emotion(item, existing ? existing.intensity : 50);
                        });
                        field.onChange(emotions);
                    }

                    return (
                        <View>
                            {Platform.OS === "web" ? (
                                <Text>Web platform not supported yet.</Text>
                                // Uncomment and implement web select component as needed
                            ) : (
                                // Mobile
                                <View style={globalStyles.selectorContainer}>
                                    <MultiSelect
                                        selectedTextStyle={globalStyles.multiSelectPlaceholder}
                                        inputSearchStyle={globalStyles.multiSelectSearch}
                                        iconStyle={globalStyles.multiSelectIcon}
                                        data={emotionOptions}
                                        labelField="label"
                                        valueField="value"
                                        value={selectedValues}
                                        onChange={()=> onChange}
                                        placeholder="בחר רגש..."
                                        search
                                        searchPlaceholder="חיפוש..."
                                    />
                                </View>
                            )}
                            {/* Intensity sliders for selected emotions */}
                            {selectValue.map((option: EmotionOption) => (
                                <View key={`slider-${option.value}`} style={globalStyles.sliderContainer}>
                                    <Text style={globalStyles.emotionLabel}>{option.label}</Text>
                                    <View style={globalStyles.sliderWithMarkings}>
                                        <View style={globalStyles.markingsContainer}>
                                            {renderSliderMarkings()}
                                        </View>
                                        <Slider
                                            style={globalStyles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={10}
                                            value={option.intensity}
                                            onValueChange={(value: number) => {
                                                const updated = field.value.map((emotion: Emotion) =>
                                                    emotion.getEmotion === option.value
                                                        ? new Emotion(option.value, value)
                                                        : emotion
                                                );
                                                field.onChange(updated);
                                            }}
                                            minimumTrackTintColor="#007AFF"
                                            maximumTrackTintColor="#CCCCCC"
                                        />
                                    </View>
                                    <Text style={globalStyles.intensityValue}>{option.intensity}%</Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
}
