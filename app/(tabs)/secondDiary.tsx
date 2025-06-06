import {JSX} from "react";
import DiaryScreen from "@/components/diary";

import {globalStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import {bgImg} from "@/assets";

export default function secondDiary(): JSX.Element {
    console.log("secondDiary()");

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <View style={globalStyles.container}>
                <DiaryScreen diary={2} />
            </View>
        </ImageBackground>
    );
}
