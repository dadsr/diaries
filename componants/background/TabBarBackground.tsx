import {aboutImg, bgImg, tabImg} from "@/assets";
import {imageStyles} from "@/styles/globalStyles";
import {ImageBackground} from "react-native";

export default function TabBarBackground() {
    return (
        <ImageBackground
            source={tabImg}
            style={imageStyles.background}
            resizeMode="cover"
        />
    )
}
