import {JSX} from "react";
import {imageStyles, viewStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import DiaryScreen from "@/componants/diary";
import {bgImg} from "@/assets";


export default function thirdDiary(): JSX.Element {
    console.log("thirdDiary()");

    return (
        <ImageBackground
            source={bgImg}
            style={imageStyles.background}
            resizeMode="cover"
        >
            <View style={viewStyles.container}>
                <DiaryScreen diary={3} />
            </View>
        </ImageBackground>
    );
}
