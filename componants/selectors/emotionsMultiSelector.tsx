import {Control, Controller} from "react-hook-form";
import {CaseFormValues, EmotionOption} from "@/models/Types";
import React, {JSX} from "react";
import {Emotion} from "@/models/Emotion";
import {EmotionKey, EmotionsConst} from "@/models/consts/EmotionsConst";
import {Platform, Text, View} from "react-native";
import {textStyles, viewStyles} from "@/styles/globalStyles";
import {MultiSelect} from "react-native-element-dropdown";
import Slider from "@react-native-community/slider";
import {emotionsStyles} from "@/styles/emotionsStyles";


interface SelectorProps {
    name: "emotions";
    diary: number;
    control: Control<CaseFormValues>;
}

export function EmotionsMultiSelector({ name, diary, control }: SelectorProps): JSX.Element {
    console.log("EmotionsMultiSelector() diary ",diary);

    const emotionOptions: EmotionOption[] = Object.entries(EmotionsConst).map(([key, emotion]) => ({
        value: key as EmotionKey,
        label: emotion.displayName,
        beforeIntensity: 50,
        afterIntensity: 50,
    }));

    // Function to render slider markings
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View
                    key={`mark-${i}`}
                    style={[emotionsStyles.sliderMark, { left: `${i}%` }]}
                >
                    <View style={emotionsStyles.markLine} />
                </View>
            );
        }
        return markings;
    };

    return (
        <View style={viewStyles.container}>
            <Text style={textStyles.text}>רגשות:</Text>
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
                                beforeIntensity: emotion.getBeforeIntensity,
                                afterIntensity: emotion.getAfterIntensity,
                            }))
                        : [];

                    // Array of selected values for MultiSelect
                    const selectedValues = selectValue.map(option => option.value);

                    const onChange = (selectedItems: string[]) => {
                        const emotions = selectedItems.map((item) => {
                            const key = item as EmotionKey;
                            const existing = selectValue.find(option => option.value === key);
                            return new Emotion(key, existing ? existing.beforeIntensity : 50, existing ? existing.afterIntensity : 50);
                        });
                        field.onChange(emotions);
                    };

                    return (
                        <View>
                            {Platform.OS === "web" ? (
                                <Text>Web platform not supported yet.</Text>
                                // todo Uncomment and implement web select component as needed
                            ) : (
                                // Mobile
                                <View style={emotionsStyles.selectorContainer}>
                                    <MultiSelect
                                        selectedTextStyle={emotionsStyles.multiSelectPlaceholder}
                                        inputSearchStyle={emotionsStyles.multiSelectSearch}
                                        iconStyle={emotionsStyles.multiSelectIcon}
                                        data={emotionOptions}
                                        labelField="label"
                                        valueField="value"
                                        value={selectedValues}
                                        onChange={onChange}
                                        placeholder="בחר רגש..."
                                        search
                                        searchPlaceholder="חיפוש..."
                                    />

                                </View>
                            )}
                            {/* before Intensity sliders for selected emotions */}
                            {diary === 3 && ( <Text style={textStyles.text}>עוצמת הרגש לפני:</Text> )}

                            {selectValue.map((option: EmotionOption) => (
                                <View key={`slider-${option.value}`} style={emotionsStyles.sliderContainer}>
                                    <Text style={emotionsStyles.emotionLabel}>{option.label}</Text>
                                    <View style={emotionsStyles.sliderWithMarkings}>
                                        <View style={emotionsStyles.markingsContainer}>
                                            {renderSliderMarkings()}
                                        </View>
                                        <Slider
                                            style={emotionsStyles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={10}
                                            value={option.beforeIntensity}
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
                                    <Text style={emotionsStyles.intensityValue}>{option.beforeIntensity}%</Text>
                                </View>
                            ))};
                            {diary === 3 && (
                                <Text style={textStyles.text}>עוצמת הרגש אחרי:</Text>
                            )}
                            {diary === 3 && (
                                <>
                                    {selectValue.map((option: EmotionOption) => (
                                        <View key={`slider-${option.value}`} style={emotionsStyles.sliderContainer}>
                                            <Text style={emotionsStyles.emotionLabel}>{option.label}</Text>
                                            <View style={emotionsStyles.sliderWithMarkings}>
                                                <View style={emotionsStyles.markingsContainer}>
                                                    {renderSliderMarkings()}
                                                </View>
                                                <Slider
                                                    style={emotionsStyles.slider}
                                                    minimumValue={0}
                                                    maximumValue={100}
                                                    step={10}
                                                    value={option.afterIntensity}
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
                                            <Text style={emotionsStyles.intensityValue}>{option.afterIntensity}%</Text>
                                        </View>
                                    ))
                                    }
                                </>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}
