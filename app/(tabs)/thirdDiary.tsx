import {JSX} from "react";
import {globalStyles} from "@/styles/globalStyles";
import {View} from "react-native";
import DiaryScreen from "@/componants/diary";


export default function thirdDiary(): JSX.Element {
    console.log("thirdDiary()");

    return (
            <View style={globalStyles.container}>
                <DiaryScreen diary={3} />
            </View>
    );
}
