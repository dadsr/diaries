import {CaseFormValues, ModalProps} from "@/models/Types";
import {ImageBackground, Modal, ScrollView, Text, View} from "react-native";
import {bgImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";
import BackButton from "@/componants/buttons/backButton";
import SaveButton from "@/componants/buttons/saveButton";

import {JSX} from "react";
import {distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import MultiChackBoxes from "@/componants/selectors/multiCheckBoxes";


export default function DistortionsModal({ diary, control, visible, onClose, onSave  }:ModalProps): JSX.Element  {
    console.log("DistortionsModal() diary ",diary);

    const clickSave = (data: CaseFormValues) => {
        onSave(data.distortionIds);
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

                    {/* Heading */}
                    <Text style={[globalStyles.heading, { paddingRight:10 }]}>
                        עיוות חשיבה
                    </Text>

                    <View style={globalStyles.selectorContainer}>
                        <Modal visible={visible} animationType="slide">
                            <View style={{ flex: 1 }}>
                                <MultiChackBoxes
                                    diary={diary}
                                    options={distortionsThoughtsArray}
                                    control={control}
                                    headerText="בחר עיוותי חשיבה"
                                    name="distortionIds"
                                />
                                <BackButton onPress={() => onClose} />
                                <SaveButton onPress={()=>clickSave} />
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </ImageBackground>
        </Modal>
    );
}
