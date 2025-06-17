import React, {JSX, useState} from "react";
import {ImageBackground, Modal, Text, TouchableOpacity, View} from "react-native";
import {Case} from "@/models/Case";
import {router} from "expo-router";
import services from "@/services/Services";
import {imageStyles, textStyles, viewStyles} from "@/styles/globalStyles";

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
                        text2: item.caseName!,
                        position: 'top',
                        swipeable: true,
                        visibilityTime: 4000,
                    });
                    if(onDelete) onDelete();
                }
            );

    };

    return (
        <View  style={viewStyles.card}>
            <Text style={textStyles.text} >אירוע: {item.caseName}</Text>
            <Text style={textStyles.text} >תאריך: {item.caseDate.toLocaleDateString('he-IL')}</Text>
            <Text style={textStyles.text} >מחשבה: {item.thought}</Text>

            <View style={[viewStyles.buttonContainer, { paddingTop:5 }]}>
                <ImageBackground
                    source={sImg}
                    style={imageStyles.background}
                    resizeMode="cover"
                >
                    <TouchableOpacity style={viewStyles.modalOpener} onPress={openFeelingsModal}>
                        <Text style={textStyles.text} >תצוגת רגשות</Text>
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
                        style={imageStyles.background}
                        resizeMode="cover"
                    >
                        <View style={viewStyles.container}>
                            <View style={textStyles.heading}>
                                <Text style={textStyles.heading}>רגשות:</Text>
                            </View>
                            <View style={viewStyles.modalContent}>
                                <EmotionCard diary={diary} emotions={item.emotions} />
                            </View>
                            <View style={viewStyles.buttonContainer}>
                                <TouchableOpacity style={viewStyles.button} onPress={closeFeelingsModal}>
                                    <Text style={textStyles.buttonText}>חזור</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </Modal>
            </View>

            {diary === 1 &&(
                <>
                    <Text style={textStyles.text} >התנהגות: {item.behavior}</Text>
                    <Text style={textStyles.text} >סימפטומים: {item.symptoms}</Text>
                </>
            )}
            {diary === 2 &&(
                <View style={[viewStyles.buttonContainer, { paddingTop:15, paddingBottom:15 }]}>
                    <ImageBackground
                        source={sImg}
                        style={imageStyles.background}
                        resizeMode="cover"
                    >
                        <TouchableOpacity style={viewStyles.modalOpener} onPress={openThoughtsModal}>
                            <Text style={textStyles.text} >מחשבות ועיוותים</Text>
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
                            style={imageStyles.background}
                            resizeMode="cover"
                        >
                            <View style={viewStyles.container}>
                                <View style={textStyles.heading}>
                                    <Text style={textStyles.heading}>מחשבות ועיוותים</Text>
                                </View>
                                <View style={[viewStyles.modalContent]}>
                                    <ThoughtsCard
                                        diary={diary}
                                        distortions={item.distortionThoughts}
                                        counterThoughts={item.counterThoughts}
                                    />
                                </View>
                                <View style={viewStyles.buttonContainer}>
                                    <TouchableOpacity style={viewStyles.button} onPress={closeThoughtsModal}>
                                        <Text style={textStyles.buttonText}>חזור</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </Modal>
                </View>
            )}

            <View style={viewStyles.buttonContainer}>
                <TouchableOpacity style={viewStyles.button} onPress={editCase}>
                    <Text style={textStyles.buttonText} >עריכה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={viewStyles.button} onPress={deleteCase}>
                    <Text style={textStyles.buttonText} >הסר</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

