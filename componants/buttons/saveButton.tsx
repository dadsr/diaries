import {Text, TouchableOpacity, View} from "react-native";
import {textStyles, viewStyles} from "../../styles/globalStyles";
import {JSX} from "react";
import {CaseFormValues} from "@/models/Types";

interface SaveProps {
    onPress: () => void;
}
export default function SaveButton({onPress}:SaveProps): JSX.Element {
    console.log("SaveButton()");

    return (
        <View style={viewStyles.buttonContainer}>
            <TouchableOpacity style={viewStyles.button} onPress={onPress}>
                <Text style={textStyles.buttonText}>שמור</Text>
            </TouchableOpacity>
        </View>
    );
}
