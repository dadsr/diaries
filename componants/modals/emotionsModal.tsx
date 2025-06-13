import React, {JSX} from 'react';
import {ImageBackground, Modal, ScrollView, Text, View} from 'react-native';
import {imageStyles, textStyles, viewStyles} from '../../styles/globalStyles';
import BackButton from "@/componants/buttons/backButton";
import {ModalProps} from "@/models/Types";
import {EmotionsMultiSelector} from "@/componants/selectors/emotionsMultiSelector";
import {bgImg} from "@/assets";
import SaveButton from "@/componants/buttons/saveButton";
import {emotionsStyles} from "@/styles/emotionsStyles";

export default function EmotionsModal({control, visible, onClose, onSave, diary}:ModalProps): JSX.Element  {
    console.log("EmotionsModal()");

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
                        רגשות
                    </Text>
                    <View style={emotionsStyles.selectorContainer}>
                        <EmotionsMultiSelector
                            diary={diary}
                            control={control}
                            name="emotions" />
                    </View>
                </ScrollView>

                <SaveButton onPress={onSave} />
            </ImageBackground>
        </Modal>
    );
}
