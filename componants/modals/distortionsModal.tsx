import {ModalProps} from "@/models/Types";
import {ImageBackground, Modal, ScrollView, Text, View} from "react-native";
import {bgImg} from "@/assets";
import {imageStyles, textStyles, viewStyles} from "@/styles/globalStyles";
import BackButton from "@/componants/buttons/backButton";
import SaveButton from "@/componants/buttons/saveButton";

import {JSX} from "react";
import {distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import MultiChackBoxes from "@/componants/selectors/multiCheckBoxes";
import {emotionsStyles} from "@/styles/emotionsStyles";


export default function DistortionsModal({ diary, control, visible, onClose, onSave  }:ModalProps): JSX.Element  {
    console.log("DistortionsModal() diary ",diary);



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
                    <Text style={[textStyles.heading, { paddingRight:10 }]}>
                        עיוות חשיבה
                    </Text>
                    <View style={emotionsStyles.selectorContainer}>
                        <MultiChackBoxes
                            diary={diary}
                            options={distortionsThoughtsArray}
                            control={control}
                            headerText="בחר עיוותי חשיבה"
                            name="distortionIds"
                        />
                    </View>
                </ScrollView>
                <SaveButton onPress={onSave} />
            </ImageBackground>
        </Modal>
    );
}
