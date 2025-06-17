import {ScrollView as DefaultScrollView, Text, View} from "react-native";
import {textStyles, viewStyles} from "@/styles/globalStyles";
import React from "react";
import {Emotion} from "@/models/Emotion";
import Slider from "@react-native-community/slider";
import {emotionsStyles} from "@/styles/emotionsStyles";


interface EmotionsProps {
    diary: number;
    emotions: Emotion[];
}

export default function EmotionCard(props: EmotionsProps) {
    console.log("EmotionCard()");
    const {diary, emotions} = props;

    // Function to render markings for slider
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[emotionsStyles.sliderMark, {left: `${i}%`}]}>
                    <View style={emotionsStyles.markLine}/>
                </View>
            );
        }
        return markings;
    };


    return (
        // <ImageBackground
        //     source={bgImg}
        //     style={imageStyles.background}
        //     resizeMode="cover"
        // >
        <DefaultScrollView style = {viewStyles.scrollView}>
        <View style={viewStyles.container}>
            {emotions.length === 0 ? (
                <View style={viewStyles.card}>
                    <Text style={textStyles.text}>לא נשמרו רגשות הגדר רגשות לאירוע במסך עריכה</Text>
                </View>
            ) : (
                    emotions.map((emotion:Emotion, index: number) => (
                    <View key={index} style={emotionsStyles.sliderContainer}>
                        <Text style={emotionsStyles.emotionLabel}>{emotion.displayName}</Text>

                        <View style={emotionsStyles.sliderWithMarkings} >
                            <View style={emotionsStyles.markingsContainer}>
                                {renderSliderMarkings()}
                            </View>

                            <Slider
                                style={emotionsStyles.slider}
                                minimumValue={0}
                                maximumValue={100}
                                step={10}
                                value={emotion.getIntensity}
                                minimumTrackTintColor="#4630EB"
                                maximumTrackTintColor="#4630EB"
                                thumbTintColor="#4630EB"
                                disabled={true}
                            />
                            <Text style={emotionsStyles.intensityValue}>{emotion.getIntensity}%</Text>
                        </View>
                    </View>
                    ))
            )}
        </View>
            </DefaultScrollView>
        // </ImageBackground>
    );
}
