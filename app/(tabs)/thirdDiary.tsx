import {JSX} from "react";
import {globalStyles} from "@/styles/globalStyles";
import {ImageBackground, View} from "react-native";
import {bgImg} from "@/assets";
import DiaryScreen from "@/componants/diary";


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
