import {bgImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";
import {ImageBackground} from "react-native";

export default function TabBarBackground() {
    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        />
    )
}
