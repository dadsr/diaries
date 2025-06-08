import {Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../styles/globalStyles";
import {JSX} from "react";

interface SaveProps {
    onPress: () => void;
}
export default function SaveButton({onPress}:SaveProps): JSX.Element {
    console.log("SaveButton()");

    return (
        <View style={globalStyles.buttonContainer}>
            <TouchableOpacity style={globalStyles.button} onPress={onPress}>
                <Text style={globalStyles.buttonText}>שמור</Text>
            </TouchableOpacity>
        </View>
    );
}
