import {JSX} from "react";
import {imageStyles, viewStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import {bgImg} from "@/assets";
import DiaryScreen from "@/componants/diary";

export default function secondDiary(): JSX.Element {
    console.log("secondDiary()");

    return (
        <ImageBackground
            source={bgImg}
            style={imageStyles.background}
            resizeMode="cover"
        >
            <View style={viewStyles.container}>
                <DiaryScreen diary={2} />
            </View>
        </ImageBackground>
    );
}
