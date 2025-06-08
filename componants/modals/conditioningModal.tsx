import {CaseFormValues, ModalProps} from "@/models/Types";
import {Button, ImageBackground, Modal, ScrollView, Text, View} from "react-native";
import {bgImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";
import BackButton from "@/componants/buttons/backButton";
import {JSX} from "react";
import MultiChackBoxes from "@/componants/selectors/multiCheckBoxes";
import {counterConditioningThoughtsArray} from "@/models/consts/CounterConditioningThoughtsConst";
import SaveButton from "@/componants/buttons/saveButton";


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
                style={globalStyles.background}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={globalStyles.scrollView}>
                    <BackButton onPress={onClose} />
                    {/* Heading */}
                    <Text style={[globalStyles.heading, { paddingRight:10 }]}>
                        מחשבות חליפיות
                    </Text>
                    <View style={globalStyles.selectorContainer}>
                        <MultiChackBoxes
                            diary={diary}
                            options={counterConditioningThoughtsArray}
                            control={control}
                            headerText="בחר מחשבות מאזנות"
                            name="counterThoughtIds"
                        />

                    </View>
                </ScrollView>
                <SaveButton onPress={clickSave} />
            </ImageBackground>
        </Modal>
    );
}
