import {JSX} from "react";
import {viewStyles} from "@/styles/globalStyles";
import {View} from "react-native";
import DiaryScreen from "@/componants/diary";


export default function thirdDiary(): JSX.Element {
    console.log("thirdDiary()");

    return (
            <View style={viewStyles.container}>
                <DiaryScreen diary={3} />
            </View>
    );
}
