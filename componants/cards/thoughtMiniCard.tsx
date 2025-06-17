import {Modal, Text, TouchableOpacity, View} from "react-native";

import {spacing, textStyles, viewStyles} from "@/styles/globalStyles";
import React, {JSX, useState} from "react";
import BackButton from "@/componants/buttons/backButton";

interface MiniThoughtProps {
    diary: number;
    displayName: string;
    description: string;
}

export default function ThoughtMiniCard({ diary, displayName, description }: MiniThoughtProps): JSX.Element {
    const [isDscModal, setIsDscModal] = useState(false);

    const openDescModal = () => {
        setIsDscModal(true);
    };

    const closeDescModal = () => {
        setIsDscModal(false);
    }




    return (
        <>

            <TouchableOpacity style={viewStyles.modalOpener} onPress={openDescModal}>
                <View style={viewStyles.miniCard}>
                    <Text style={textStyles.miniText}>{displayName}</Text>
                </View>
            </TouchableOpacity>


            <Modal
                visible={isDscModal}
                animationType="fade"
                presentationStyle="pageSheet"
                onRequestClose={closeDescModal}
                transparent={true}
            >
                <View style={viewStyles.miniModalOpener}>
                    <View style={viewStyles.DscCard}>
                        <Text style={[textStyles.text,{paddingRight:spacing.s}]}>{description}</Text>
                        <BackButton onPress={closeDescModal}/>
                    </View>
                </View>
            </Modal>
        </>

    );
}
