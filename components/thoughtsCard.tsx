import {ImageBackground, Text, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles";
import React, { JSX } from "react";
import {DistortionThought} from "@/models/DistortionThought";
import {CounterConditioningThought} from "@/models/CounterConditioningThought";
import {bgImg} from "@/assets";


interface ThoughtsProps {
    diary: number;
    distortions: DistortionThought[];
    counterThoughts: CounterConditioningThought[];
}

export default function ThoughtsCard({diary, distortions, counterThoughts}: ThoughtsProps ): JSX.Element {
    console.log("ThoughtsCard()");

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <View style={globalStyles.container}>
                {distortions.length === 0 && counterThoughts.length === 0 ? (
                    <View style={globalStyles.card}>
                        <Text style={globalStyles.text}>לא נשמרו מחשבות הגדר מחשבות במסך עריכה</Text>
                    </View>
                ) : (
                    <View style={{ marginVertical: 10 }}>

                    </View>
                )}
            </View>
        </ImageBackground>
    );
}
