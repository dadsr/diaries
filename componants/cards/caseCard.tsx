import React, {JSX, useState} from "react";
import {ImageBackground, Modal, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Case} from "@/models/Case";
import {router} from "expo-router";
import services from "@/services/Services";
import {globalStyles} from "@/styles/globalStyles";

import {bgImg, sImg} from "@/assets";
import EmotionCard from "@/componants/cards/emotionCards";
import ThoughtsCard from "@/componants/cards/thoughtsCard";



interface caseProps {
    diary: number;
    case: Case;
}

export default function CaseCard(props: caseProps): JSX.Element {
    console.log("CaseCard()");

    const {diary: diary,case: item } = props
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

// todo refresh after delete
    const deleteCase = () => {
        console.log("deleteCase() id:",item.id);
        services.deleteCase(diary, item.id);

        switch(diary) {
            case 1:
                router.replace('/(tabs)/firstDiary');
                break;
            case 2:
                router.replace('/(tabs)/secondDiary');
                break;
            case 3:{
                router.replace('/(tabs)/thirdDiary');
                break;
            }
        }
    };

    return (
        <View  style={globalStyles.card}>
            <Text style={globalStyles.text} >אירוע: {item.caseName}</Text>
            <Text style={globalStyles.text} >תאריך: {item.caseDate.toLocaleDateString('he-IL')}</Text>
            <Text style={globalStyles.text} >מחשבה: {item.thought}</Text>
            <View style={[globalStyles.buttonContainer,{borderWidth:2,borderRadius:10,borderColor:'#000'}]}>
                <ImageBackground
                    source={sImg}
                    style={[globalStyles.background,{height:'150%',paddingBottom:20}]}
                    resizeMode="cover"
                >
                    <TouchableOpacity style={globalStyles.modelOpener} onPress={openFeelingsModal}>
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
                    <ImageBackground
                        source={bgImg}
                        style={globalStyles.background}
                        resizeMode="cover"
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
                    </ImageBackground>
                </Modal>
            </View>

            {diary === 1 &&(
                <>
                    <Text style={globalStyles.text} >התנהגות: {item.behavior}</Text>
                    <Text style={globalStyles.text} >סימפטומים: {item.symptoms}</Text>
                </>
            )}
            {diary === 2 &&(
                <View style={[globalStyles.buttonContainer,{borderWidth:2,borderRadius:10,borderColor:'#000'}]}>
                    <ImageBackground
                        source={sImg}
                        style={[globalStyles.background,{height:'150%',paddingBottom:20}]}
                        resizeMode="cover"
                    >
                        <TouchableOpacity style={globalStyles.modelOpener} onPress={openThoughtsModal}>
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
