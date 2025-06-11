import {CaseFormValues, ModalProps} from "@/models/Types";
import {Button, ImageBackground, Modal, ScrollView, Text, View} from "react-native";
import {bgImg} from "@/assets";
import {imageStyles, textStyles, viewStyles} from "@/styles/globalStyles";
import BackButton from "@/componants/buttons/backButton";
import {JSX} from "react";
import MultiChackBoxes from "@/componants/selectors/multiCheckBoxes";
import {counterConditioningThoughtsArray} from "@/models/consts/CounterConditioningThoughtsConst";
import SaveButton from "@/componants/buttons/saveButton";
import {emotionsStyles} from "@/styles/emotionsStyles";


export default function ConditioningModal({ diary, control, visible, onClose, onSave  }:ModalProps): JSX.Element  {
    console.log("ConditioningModal() diary ",diary);

    const clickSave = (data: CaseFormValues) => {
        onSave(data.counterThoughtIds);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            presentationStyle="formSheet"
            onRequestClose={onClose}
            transparent={false}
        >
            <ImageBackground
                source={bgImg}
                style={imageStyles.background}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={viewStyles.scrollView}>
                    <BackButton onPress={onClose} />
                    {/* Heading */}
                    <Text style={textStyles.heading}>
                        מחשבות חליפיות
                    </Text>
                    <View style={emotionsStyles.selectorContainer}>
                        <MultiChackBoxes
                            diary={diary}
                            options={counterConditioningThoughtsArray}
                            control={control}
                            headerText="בחר מחשבות מאזנות"
                            name="counterThoughtIds"
                        />

                    </View>
                </ScrollView>
                <SaveButton onPress={() =>clickSave} />
            </ImageBackground>
        </Modal>
    );
}
