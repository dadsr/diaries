import {ModalProps} from "@/models/Types";
import {ImageBackground, Modal, Text, View} from "react-native";
import {bgImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";
import BackButton from "@/components/Modals/components/backButton";
import MultiSelectCheckboxes from "@/components/Modals/multiSelectCheckboxes";
import {JSX} from "react";


export default function ConditioningModal(props: ModalProps): JSX.Element  {
    console.log("ConditioningModal()");
    const {control, visible, onClose, onSave, options, diary } = props;

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
                <BackButton onPress={onClose} />


                {/* Heading */}
                    <Text style={[globalStyles.heading, { paddingRight:10 }]}>
                        מחשבות חליפיות
                    </Text>

                    {/* Multi-select checklist */}
                    <View style={globalStyles.selectorContainer}>
                        <MultiSelectCheckboxes  diary={diary} options={options} onClose={onClose} onSave={onSave} headerText="מחשבות חליפיות" />
                    </View>
            </ImageBackground>
        </Modal>
    );
}
