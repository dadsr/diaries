import React, {JSX, useState} from "react";
import {ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Case} from "@/models/Case";
import {router} from "expo-router";
import services from "@/services/Services";
import {globalStyles} from "@/styles/globalStyles";

import {bgImg, sImg} from "@/assets";
import EmotionCard from "@/componants/cards/emotionCards";
import ThoughtsCard from "@/componants/cards/thoughtsCard";
import Toast from "react-native-toast-message";


interface caseProps {
    diary: number;
    case: Case;
    onDelete?: () => void;
}

export default function CaseCard({diary, case: item, onDelete}: caseProps): JSX.Element {
    console.log("CaseCard()");

    const [isFeelingsModalVisible, setIsFeelingsModalVisible] = useState(false);
    const [isThoughtsModalVisible, setIsThoughtsModalVisible] = useState(false);

    const openFeelingsModal = () => setIsFeelingsModalVisible(true);
    const closeFeelingsModal = () => setIsFeelingsModalVisible(false);

    const openThoughtsModal = () => setIsThoughtsModalVisible(true);
    const closeThoughtsModal = () => setIsThoughtsModalVisible(false);


    const editCase = () => {
        console.log("editCase() id:",item.id);

        router.push({ pathname: '/editCase', params: {diary: diary, id: item.id } });
    };

    const deleteCase = () => {
        console.log("deleteCase() id:",item.id);
        services.deleteCase(diary, item.id)
            .then(
                () =>{
                    Toast.show({
                        type: 'success',
                        text1: 'אירוע נמחק',
                        text2: item.caseName,
                        position: 'top',
                        swipeable: true,
                        visibilityTime: 4000,
                    });
                    if(onDelete) onDelete();
                }
            );

    };

    return (
        <View  style={globalStyles.card}>
            <Text style={globalStyles.text} >אירוע: {item.caseName}</Text>
            <Text style={globalStyles.text} >תאריך: {item.caseDate.toLocaleDateString('he-IL')}</Text>
            <Text style={globalStyles.text} >מחשבה: {item.thought}</Text>
            <View style={globalStyles.buttonContainer}>
                <ImageBackground
                    source={sImg}
                    style={globalStyles.background}
                    resizeMode="cover"
                >
                    <TouchableOpacity style={globalStyles.modalOpener} onPress={openFeelingsModal}>
                        <Text style={globalStyles.text} >תצוגת רגשות</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <Modal
                    visible={isFeelingsModalVisible}
                    animationType="slide"
                    presentationStyle="pageSheet"
                    onRequestClose={closeFeelingsModal}
                    // transparent={true}
                >
                    <View style={globalStyles.container}>
                        <View style={globalStyles.heading}>
                            <Text style={globalStyles.heading}>רגשות:</Text>
                        </View>
                        <View style={globalStyles.modalContent}>
                            <EmotionCard diary={diary} emotions={item.emotions} />
                        </View>
                        <View style={globalStyles.buttonContainer}>
                            <TouchableOpacity style={globalStyles.button} onPress={closeFeelingsModal}>
                                <Text style={globalStyles.buttonText}>חזור</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>

            {diary === 1 &&(
                <>
                    <Text style={globalStyles.text} >התנהגות: {item.behavior}</Text>
                    <Text style={globalStyles.text} >סימפטומים: {item.symptoms}</Text>
                </>
            )}
            {diary === 2 &&(
                <View style={globalStyles.buttonContainer}>
                    <ImageBackground
                        source={sImg}
                        style={globalStyles.background}
                        resizeMode="cover"
                    >
                        <TouchableOpacity style={globalStyles.modalOpener} onPress={openThoughtsModal}>
                            <Text style={globalStyles.text} >מחשבות ועיוותים</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    <Modal
                        visible={isThoughtsModalVisible}
                        animationType="fade"
                        presentationStyle="formSheet"
                        onRequestClose={closeThoughtsModal}
                        // transparent={true}
                    >
                        <ImageBackground
                            source={bgImg}
                            style={globalStyles.background}
                            resizeMode="cover"
                        >
                            <View style={globalStyles.container}>
                                <View style={globalStyles.heading}>
                                    <Text style={globalStyles.heading}>מחשבות ועיוותים</Text>
                                </View>
                                <View style={globalStyles.modalContent}>
                                    <ThoughtsCard diary={diary} distortions={item.distortionIds} counterThoughts={item.counterThoughtIds} />
                                </View>
                                <View style={globalStyles.buttonContainer}>
                                    <TouchableOpacity style={globalStyles.button} onPress={closeThoughtsModal}>
                                        <Text style={globalStyles.buttonText}>חזור</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </Modal>
                </View>
            )}

            <View style={globalStyles.buttonContainer}>
                <TouchableOpacity style={globalStyles.button} onPress={editCase}>
                    <Text style={globalStyles.buttonText} >עריכה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.button} onPress={deleteCase}>
                    <Text style={globalStyles.buttonText} >הסר</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    case_info: {},
    case_preview_name_container: {},
    case_preview_id: {},
    button_card: {},
});
