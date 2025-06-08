import {JSX} from "react";
import {globalStyles} from "@/styles/globalStyles";
import {View, ImageBackground} from "react-native";
import {bgImg} from "@/assets";
import DiaryScreen from "@/componants/diary";



export default function firstDiary(): JSX.Element {
    console.log("firstDiary()");

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <View style={globalStyles.container}>
                <DiaryScreen diary={1} />
            </View>
        </ImageBackground>
    );
}
