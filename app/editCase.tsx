import {bgImg, sImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
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


export default function EditCase(): JSX.Element {
    const insets = useSafeAreaInsets();
    const diary: number = Number(useLocalSearchParams().diary);
    const id: number = Number(useLocalSearchParams().id);

    const [selectedDistortionsThoughtsIds, setSelectedDistortionsThoughtsIds] = useState<string[]>([]);

    const [selectedConditioningThoughtsIds, setSelectedConditioningThoughtsIds] = useState<string[]>([]);

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [showPicker, setShowPicker] = useState(false);
    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isDistorsionsModalVisible, setIsDistorsionsModalVisible] = useState(false);
    const [isConditioningModalVisible, setIsConditioningModalVisible] = useState(false);
    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm<CaseFormValues>({
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

        setIsSubmiting(true);
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
            await services.updateCase(diary,caseInstance);
        } else {
            await services.addCase(diary,caseInstance);
        }
        setIsSubmiting(false);
        router.back();
    };

    const handleEmotionsSave = (data: CaseFormValues) => {
        setValue('emotions', data.emotions);
        setIsEmotionsModalVisible(false);
    };

    const handleDistortionsSave = (data: CaseFormValues) => {
        setValue('distortionIds', data.distortionIds);
        setIsDistorsionsModalVisible(false);
    };

    const handleConditioningSave = (data: CaseFormValues) => {
        setValue('counterThoughtIds', data.counterThoughtIds);
        setIsConditioningModalVisible(false);
    };

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <SafeAreaView  style = {[globalStyles.container, {
                paddingTop: Math.max(insets.top + 15,20),
                paddingBottom: Math.max(insets.bottom - 5,20)}]}>
                <BackButton onPress={onBack}/>
                <DefaultScrollView style = {globalStyles.scrollView}>

                    {/*caseName*/}
                    <Text style={globalStyles.text} >אירוע:</Text>
                    <Controller
                        name="caseName"
                        control={control}
                        rules={{required: "שם האירוע הוא שדה חובה"}}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={[globalStyles.input,globalStyles.rtlText]}
                                placeholder="שם האירוע"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                    {/*Date*/}
                    <Text style={globalStyles.text} >תאריך:</Text>
                    <Controller
                        name="caseDate"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                {Platform.OS === 'web' ? (
                                    <input
                                        type="date"
                                        style={globalStyles.input}
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
                                                style={globalStyles.input}
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
                                                display="default"
                                                onChange={(event, selectedDate) => {
                                                    setShowPicker(false); // Hide picker after selection
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
                    <Text style={globalStyles.text} >מחשבה:</Text>
                    <Controller
                        name="thought"
                        control={control}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={globalStyles.textarea}
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
                        <View style={[
                            globalStyles.buttonContainer,
                            { borderWidth:5, borderRadius:10, borderColor:'#000' }
                        ]}>
                            <ImageBackground
                                source={sImg}
                                style={[globalStyles.selectbackground]}
                                resizeMode="cover"
                            >
                                <TouchableOpacity
                                    style={globalStyles.modelOpener}
                                    onPress={() => setIsEmotionsModalVisible(true)}
                                >
                                    <Text style={globalStyles.text}>רגשות</Text>
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
                            <Text style={globalStyles.text} >התנהגות:</Text>
                            <Controller
                                name="behavior"
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={globalStyles.textarea}
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
                            <Text style={globalStyles.text} >סימפטומים:</Text>
                            <Controller
                                name="symptoms"
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={globalStyles.textarea}
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
                                <View style={[
                                    globalStyles.buttonContainer,
                                    { borderWidth:5, borderRadius:10, borderColor:'#000' }
                                ]}>
                                    <ImageBackground
                                        source={sImg}
                                        style={[globalStyles.selectbackground]}
                                        resizeMode="cover"
                                    >
                                        <TouchableOpacity
                                            style={globalStyles.modelOpener}
                                            onPress={() => setIsDistorsionsModalVisible(true)}
                                        >
                                            <Text style={globalStyles.text}>עיוות חשיבה</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )}

                            <DistortionsModal
                                control={control}
                                visible={isDistorsionsModalVisible}
                                onClose={() => setIsDistorsionsModalVisible(false)}
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
                                <View style={[
                                    globalStyles.buttonContainer,
                                    { borderWidth:5, borderRadius:10, borderColor:'#000' }
                                ]}>
                                    <ImageBackground
                                        source={sImg}
                                        style={[globalStyles.selectbackground]}
                                        resizeMode="cover"
                                    >
                                        <TouchableOpacity
                                            style={globalStyles.modelOpener}
                                            onPress={() => setIsConditioningModalVisible(true)}
                                        >
                                            <Text style={globalStyles.text}>מחשבות חליפיות</Text>
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
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={handleSubmit(submitForm)}>
                        <Text style={globalStyles.buttonText} >שמירה</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </ImageBackground>
    )
}
