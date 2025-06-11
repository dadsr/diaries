import {bgImg} from "@/assets";
import {imageStyles} from "@/styles/globalStyles";
import {ImageBackground} from "react-native";

export default function TabBarBackground() {
    return (
        <ImageBackground
            source={bgImg}
            style={imageStyles.background}
            resizeMode="cover"
        />
    )
}
