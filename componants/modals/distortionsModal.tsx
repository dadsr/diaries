import {ModalProps} from "@/models/Types";
import {ImageBackground, Modal, View, Text} from "react-native";
import {bgImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";
import BackButton from "@/componants/buttons/backButton";
import SaveButton from "@/componants/buttons/saveButton";
import MultiSelectCheckboxes from "@/comp/modals/multiSelectCheckboxes";
import {JSX} from "react";



export default function DistortionsModal(props: ModalProps): JSX.Element  {
    console.log("DistortionsModal()");
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
                    עיוות חשיבה
                </Text>

                {/* Multi-select checklist */}
                <View style={globalStyles.selectorContainer}>
                    <MultiSelectCheckboxes  diary={diary} options={options} onClose={onClose} onSave={onSave} headerText="עיוות חשיבה" />
                </View>

            </ImageBackground>
        </Modal>
    );
}
