import {bgImg, sImg} from "@/assets";
import {globalStyles} from "@/styles/globalStyles";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Controller, useForm} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {router, useLocalSearchParams} from "expo-router";
import React, {JSX, useEffect, useState} from "react";
import {ImageBackground, Platform, SafeAreaView, ScrollView as DefaultScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import services from "@/services/Services";
import {Emotion} from "@/models/Emotion";
import {Case} from "@/models/Case";
import {CaseFormValues, ThoughtItem} from "@/models/Types";
import BackButton from "@/components/Modals/components/backButton";

import EmotionsModal from "@/components/Modals/emotionsModal";
import {DistortionThought} from "@/models/DistortionThought";
import DistortionsModal from "@/components/Modals/distortionsModal";
import ConditioningModal from "@/components/Modals/conditioningModal";
import {DistortionsThoughtKey, distortionsThoughtsArray} from "@/models/consts/DistortionsThoughtsConst";
import {CounterConditioningThought} from "@/models/CounterConditioningThought";
import {counterConditioningThoughtsArray, CounterThoughtKey} from "@/models/consts/CounterConditioningThoughtsConst";


export default function EditCase(): JSX.Element {
    const insets = useSafeAreaInsets();
    const diary: number = Number(useLocalSearchParams().diary);
    const id: number = Number(useLocalSearchParams().id);

    const [distortionsThoughts, setisDistortortionsThoughtsArray] = useState<ThoughtItem[]>((distortionsThoughtsArray));
    const [selectedDistortionsThoughtsIds, setSelectedDistortionsThoughtsIds] = useState<string[]>([]);

    const [counterConditioningThoughts, setCounterConditioningThoughtsArray] = useState<ThoughtItem[]>((counterConditioningThoughtsArray));
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
            distortions: [] as DistortionThought[],
            counterThoughts: [] as CounterConditioningThought[],
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
                    setValue('distortions', myCase.distortions.map((thought: DistortionThought) => new DistortionThought(thought.getDistortion)));
                    setValue('counterThoughts', myCase.counterThoughts.map((thought: CounterConditioningThought) => new CounterConditioningThought(thought.getCounterThought)));

                    setSelectedDistortionsThoughtsIds(
                        myCase.distortions
                            .map((thought: DistortionThought) => thought.getDistortion)
                            .filter((id): id is DistortionsThoughtKey => id !== null)
                    );
                    setSelectedConditioningThoughtsIds(
                        myCase.counterThoughts
                            .map((thought: CounterConditioningThought) => thought.getCounterThought)
                            .filter((id): id is CounterThoughtKey => id !== null)
                    );
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
        caseInstance.emotions = data.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity));
        caseInstance.behavior = data.behavior;
        caseInstance.symptoms = data.symptoms;
        caseInstance.distortions = data.distortions.map((thought:DistortionThought) => new DistortionThought(thought.getDistortion));
        caseInstance.counterThoughts = data.counterThoughts.map((thought:CounterConditioningThought) => new CounterConditioningThought(thought.getCounterThought));

        if (caseInstance.id > 0) {
            await services.updateCase(diary,caseInstance);
        } else {
            await services.addCase(diary,caseInstance);
        }
        setIsSubmiting(false);
        router.back();
    };

    const handleDistortionsSave = (selectedIds: string[]) => {
        setSelectedDistortionsThoughtsIds(selectedIds);
        setIsDistorsionsModalVisible(false);
    };

    const handleConditioningSave = (selectedIds: string[]) => {
        setSelectedConditioningThoughtsIds(selectedIds);
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
                            onSave={() => setIsEmotionsModalVisible(false)}
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
                                onSave={() => handleDistortionsSave(selectedDistortionsThoughtsIds)}
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
                                onSave={() => handleConditioningSave(selectedConditioningThoughtsIds)}
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
