import {JSX} from "react";
import DiaryScreen from "@/components/diary";
import {globalStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import {bgImg} from "@/assets";


export default function thirdDiary(): JSX.Element {
    console.log("thirdDiary()");

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <View style={globalStyles.container}>
                <DiaryScreen diary={3} />
            </View>
        </ImageBackground>
    );
}
