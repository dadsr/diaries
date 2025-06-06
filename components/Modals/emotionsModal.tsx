import React, { JSX } from 'react';
import {  Modal, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {EmotionsSelector} from "./emotionsSelector";
import background from '../../assets/images/bgImg.jpg';
import {globalStyles} from '../../styles/globalStyles';
import BackButton from "@/components/Modals/components/backButton";
import SaveButton from "@/components/Modals/components/saveButton";
import {ModalProps} from "@/models/Types";

export default function EmotionsModal({
                                          control,
                                          visible,
                                             onClose,
                                             onSave,
                                             options,
                                            diary
                                         }:ModalProps): JSX.Element  {
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
                        <EmotionsSelector
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
