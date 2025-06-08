import {JSX} from "react";

import {globalStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import {bgImg} from "@/assets";
import DiaryScreen from "@/componants/diary";

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
