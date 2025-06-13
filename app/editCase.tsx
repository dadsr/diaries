import {bgImg, sImg} from "@/assets";
import {imageStyles, textStyles, viewStyles} from "@/styles/globalStyles";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Controller, useForm, UseFormTrigger} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {router, useLocalSearchParams} from "expo-router";
import React, {JSX, useEffect, useState} from "react";
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    ScrollView as DefaultScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import services from "@/services/Services";
import {Emotion} from "@/models/Emotion";
import {Case} from "@/models/Case";
import {CaseFormValues} from "@/models/Types";
import BackButton from "@/componants/buttons/backButton";

import EmotionsModal from "@/componants/modals/emotionsModal";
import DistortionsModal from "@/componants/modals/distortionsModal";
import ConditioningModal from "@/componants/modals/conditioningModal";
import {distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import {counterConditioningThoughtsArray} from "@/models/consts/CounterConditioningThoughtsConst";
import Toast from "react-native-toast-message";


export default function EditCase(): JSX.Element {
    const insets = useSafeAreaInsets();
    const diary: number = Number(useLocalSearchParams().diary);
    const id: number = Number(useLocalSearchParams().id);
    const [showPicker, setShowPicker] = useState(false);
    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isDistortionsModalVisible, setIsDistortionsModalVisible] = useState(false);
    const [isConditioningModalVisible, setIsConditioningModalVisible] = useState(false);
    const {control, trigger, handleSubmit, setValue} = useForm<CaseFormValues>({
        defaultValues: {
            id: 0,
            caseName: '',
            caseDate: new Date(),
            thought: '',
            emotions: [] as Emotion[],
            behavior: '',
            symptoms: '',
            distortionIds: [] ,
            counterThoughtIds: [],
        }
    });

    console.log("EditCase() diary ",diary);

    useEffect(() => {
        console.log("useEffect() id:",id);
        if (id > 0) {
            (async () => {
                const myCase: Case | null = await services.getCase(diary,id);
                if (myCase) {
                    setValue('id', myCase.id);
                    setValue('caseName', myCase.caseName!);
                    setValue('caseDate', myCase.caseDate!);
                    setValue('thought', myCase.thought!);
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('emotions', myCase.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity)));
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('distortionIds', myCase.distortionIds);
                    setValue('counterThoughtIds',  myCase.counterThoughtIds);
                }
            })();
        }
    }, [id,setValue]);

    const onBack =(() =>{
        console.log("onBack() diary ",diary);
        router.back();
    });

    const submitForm = async (data: CaseFormValues) => {
        console.log("submitForm diary ",diary);
        const caseInstance = new Case();
        caseInstance.id = data.id;
        caseInstance.caseName = data.caseName;
        caseInstance.caseDate = data.caseDate;
        caseInstance.thought = data.thought;
        caseInstance.behavior = data.behavior;
        caseInstance.symptoms = data.symptoms;
        caseInstance.emotions = data.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity));
        caseInstance.distortionIds = data.distortionIds;
        caseInstance.counterThoughtIds = data.counterThoughtIds;

        if (caseInstance.id > 0) {
            await services.updateCase(diary,caseInstance)
                .then(() =>{
                        Toast.show({
                            type: 'success',
                            text1: 'אירוע עודכן',
                            text2: caseInstance.caseName!,
                            position: 'top',
                            swipeable: true,
                            visibilityTime: 4000,
                        });
                    }
                )
        } else {
            await services.addCase(diary,caseInstance)
                .then(() =>{
                        Toast.show({
                            type: 'success',
                            text1: 'אירוע חדש נשמר',
                            text2: caseInstance.caseName!,
                            position: 'top',
                            swipeable: true,
                            visibilityTime: 4000,
                        });
                    }
                );
        }
        router.back();
    };

    const handleOpenModal = async (setModalVisible:React.Dispatch<React.SetStateAction<boolean>>,trigger: UseFormTrigger<any>)=>{
        const isValid = await trigger ("caseName");
        if (isValid) {
            setModalVisible(true);
        }else {
            Toast.show({
                    type:'info',
                    text1: 'שים לב!',
                    text2: 'שם האירוע הוא שדה חובה',
                    position:'top',
                    swipeable:true,
                    visibilityTime:4000,
                }
            );
        }
    }



    const handleEmotionsSave = (data: CaseFormValues) => {
        console.log("handleEmotionsSave() id:",data.id);
        setValue('emotions', data.emotions);
        Toast.show({
                type:'success',
                text1: 'רגשות עודכנו',
                text2: '',
                position:'top',
                swipeable:true,
                visibilityTime:2000,
            }
        );
        setIsEmotionsModalVisible(false);
    };

    const handleDistortionsSave = (data: CaseFormValues) => {
        console.log("handleDistortionsSave() id:",data.id);
        setValue('distortionIds', data.distortionIds);
        Toast.show({
                type:'success',
                text1: 'מחשבות עודכנו',
                text2: '',
                position:'top',
                swipeable:true,
                visibilityTime:2000,
            }
        );
        setIsDistortionsModalVisible(false);
    };

    const handleConditioningSave = (data: CaseFormValues) => {
        console.log("handleConditioningSave() id:",data.id);
        setValue('counterThoughtIds', data.counterThoughtIds);
        Toast.show({
                type:'success',
                text1: 'מחשבות עודכנו',
                text2: '',
                position:'top',
                swipeable:true,
                visibilityTime:2000,
            }
        );
        setIsConditioningModalVisible(false);
    };
    return (
        <ImageBackground
            source={bgImg}
            style={imageStyles.background}
            resizeMode="cover"

        >
            <SafeAreaView  style = {[viewStyles.container, { paddingTop: Math.max(insets.top + 15,20), paddingBottom: Math.max(insets.bottom - 5,20) }]}>
                <BackButton onPress={onBack}/>
                <DefaultScrollView style = {viewStyles.scrollView}>

                    {/*caseName*/}
                    <Text style={textStyles.text} >אירוע:</Text>
                    <Controller
                        name="caseName"
                        control={control}
                        rules={{required: "שם האירוע הוא שדה חובה"}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={[textStyles.inputText,textStyles.rtlText]}
                                placeholder="שם האירוע"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    {/*Date*/}
                    <Text style={textStyles.text} >תאריך:</Text>
                    <Controller
                        name="caseDate"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                {Platform.OS === 'web' ? (
                                    <input
                                        type="date"
                                        style={textStyles.inputText}
                                        placeholder="תאריך האירוע"
                                        value={value ? new Date(value).toISOString().substring(0, 10) : ''}
                                        onChange={event => {
                                            // Only update if a date is selected
                                            if (event.target.value) {
                                                onChange(new Date(event.target.value).toISOString());
                                            }
                                        }}
                                        onBlur={onBlur}
                                    />
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={() => setShowPicker(true)}>
                                            <TextInput
                                                style={textStyles.inputText}
                                                placeholder="תאריך האירוע"
                                                onBlur={onBlur}
                                                value={value ? new Date(value).toLocaleDateString('he-IL') : ''}
                                                editable={false}
                                                pointerEvents="none"
                                            />
                                        </TouchableOpacity>
                                        {showPicker && (
                                            <DateTimePicker
                                                value={value ? new Date(value) : new Date()}
                                                mode="date"
                                                display="spinner"
                                                onChange={(event, selectedDate) => {
                                                    setShowPicker(false);
                                                    if (selectedDate) {
                                                        onChange(selectedDate.toISOString());
                                                    }
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    />

                    {/*Thought*/}
                    <Text style={textStyles.text} >מחשבה:</Text>
                    <Controller
                        name="thought"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={viewStyles.textarea}
                                placeholder="מחשבה"
                                multiline={true}
                                numberOfLines={4}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    {/* Emotions */}
                    <>
                        <View style={[viewStyles.buttonContainer, { paddingTop:30 }]}>
                            <ImageBackground
                                source={sImg}
                                style={imageStyles.background}
                                resizeMode="cover"
                            >
                                <TouchableOpacity
                                    style={viewStyles.modalOpener}
                                    onPress={() => handleOpenModal(setIsEmotionsModalVisible,trigger)}
                                >
                                    <Text style={textStyles.text}>רגשות</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>

                        <EmotionsModal
                            control={control}
                            visible={isEmotionsModalVisible}
                            onClose={() => setIsEmotionsModalVisible(false)}
                            onSave={handleSubmit(handleEmotionsSave)}
                            options={distortionsThoughtsArray}
                            diary={diary}
                        />
                    </>

                    {/*behavior*/}
                    {diary === 1 &&(
                        <>
                            <Text style={textStyles.text} >התנהגות:</Text>
                            <Controller
                                name="behavior"
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={viewStyles.textarea}
                                        placeholder="התנהגות"
                                        multiline={true}
                                        numberOfLines={4}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </>
                    )}

                    {/*symptoms*/}
                    {diary === 1 &&(
                        <>
                            <Text style={textStyles.text} >סימפטומים:</Text>
                            <Controller
                                name="symptoms"
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={viewStyles.textarea}
                                        placeholder="סימפטומים"
                                        multiline={true}
                                        numberOfLines={4}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </>
                    )}

                    {/* Distortions Thoughts*/}
                    {diary === 2 &&(
                        <>
                            {diary === 2 && (
                                <View style={[viewStyles.buttonContainer, { paddingTop:30 }]}>
                                    <ImageBackground
                                        source={sImg}
                                        style={viewStyles.selectbackground}
                                        resizeMode="cover"
                                    >
                                        <TouchableOpacity
                                            style={viewStyles.modalOpener}
                                            onPress={()=> handleOpenModal(setIsDistortionsModalVisible,trigger)}
                                        >
                                            <Text style={textStyles.text}>עיוות חשיבה</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )}

                            <DistortionsModal
                                control={control}
                                visible={isDistortionsModalVisible}
                                onClose={() => setIsDistortionsModalVisible(false)}
                                onSave={handleSubmit(handleDistortionsSave)}
                                options={distortionsThoughtsArray}
                                diary={diary}
                            />
                        </>
                    )}

                    {/* Counter Conditioning Thoughts*/}
                    {diary === 2 &&(
                        <>
                            {diary === 2 && (
                                <View style={[viewStyles.buttonContainer, { paddingTop:30 }]}>
                                    <ImageBackground
                                        source={sImg}
                                        style={viewStyles.selectbackground}
                                        resizeMode="cover"
                                    >
                                        <TouchableOpacity
                                            style={viewStyles.modalOpener}
                                            onPress={()=> handleOpenModal(setIsConditioningModalVisible,trigger)}
                                        >
                                            <Text style={textStyles.text}>מחשבות חליפיות</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )}

                            <ConditioningModal
                                control={control}
                                visible={isConditioningModalVisible}
                                onClose={() => setIsConditioningModalVisible(false)}
                                onSave={handleSubmit(handleConditioningSave)}
                                options={counterConditioningThoughtsArray}
                                diary={diary}
                            />
                        </>
                    )}

                </DefaultScrollView>
                <View style={viewStyles.buttonContainer}>
                    <TouchableOpacity style={viewStyles.button} onPress={handleSubmit(submitForm)}>
                        <Text style={textStyles.buttonText} >שמירה</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </ImageBackground>
    );
}
