import React, {JSX} from 'react';
import {ImageBackground, Modal, ScrollView, Text, View} from 'react-native';
import background from '../../assets/images/bgImg.jpg';
import {globalStyles} from '../../styles/globalStyles';
import BackButton from "@/componants/buttons/backButton";
import {ModalProps} from "@/models/Types";
import {EmotionsMultiSelector} from "@/componants/selectors/emotionsMultiSelector";

export default function EmotionsModal({control, visible, onClose, onSave, options, diary  }:ModalProps): JSX.Element  {
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
                source={background}
                style={globalStyles.background}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={globalStyles.scrollView}>

                    <BackButton onPress={onClose} />

                    {/* Heading */}
                    <Text style={[globalStyles.heading, { paddingRight:10 }]}>
                        רגשות
                    </Text>

                    {/* Multi-select checklist */}
                    <View style={globalStyles.selectorContainer}>
                        <EmotionsMultiSelector
                            diary={diary}
                            control={control}
                            name="emotions" />
                    </View>
                </ScrollView>

                {/*<SaveButton onPress={onSave}/>*/}
            </ImageBackground>
        </Modal>
    );
}
