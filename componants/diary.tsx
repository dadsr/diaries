import {JSX, useCallback, useState} from "react";
import {Case} from "@/models/Case";
import services from "@/services/Services";
import {router, useFocusEffect} from "expo-router";
import {SafeAreaView, ScrollView as DefaultScrollView, Text, TouchableOpacity, View} from "react-native";
import {textStyles, viewStyles} from "@/styles/globalStyles";

import {useSafeAreaInsets} from "react-native-safe-area-context";
import CaseCard from "@/componants/cards/caseCard";


type DiaryProps = {
    diary:number;
};

export default function DiaryScreen({ diary }: DiaryProps): JSX.Element {
    console.log("DiaryScreen ",diary);
    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    const fetchCases = useCallback(() => {
        services.getCases(diary)
            .then((fetchedCases: Case[]) => {
                setCases(fetchedCases)
            });
    },[diary]);

    const handleCaseDeleted = () => {
        fetchCases();
    };

    useFocusEffect (fetchCases);

    const addNewCase = () => {
        console.log('addNewCase()');
        router.push({ pathname: '/editCase', params: { diary:diary, id: 0 } });

    };


    return (
            <SafeAreaView  style = {[viewStyles.container, {
                paddingTop: Math.max(insets.top + 8,20),
                paddingBottom: Math.max(insets.bottom - 25,20)}]}>

                <Text style = {textStyles.heading}>רשימת אירועים:</Text>
                <DefaultScrollView  style = {viewStyles.scrollView}>
                    {cases.length > 0 ?(
                        cases.map(c => <CaseCard key={c.id} diary={diary} case={c} onDelete={handleCaseDeleted} />)
                    ): (
                        <View style = {viewStyles.card}>
                            <Text style={textStyles.text}>לא נמצאו אירועים.</Text>
                            <Text style={textStyles.text}>לחץ על הוספת אירוע כדי להתחיל.</Text>
                        </View>
                    )}
                </DefaultScrollView >

                <View style={viewStyles.buttonContainer}>
                    <TouchableOpacity style={viewStyles.button} onPress={addNewCase}>
                        <Text style={textStyles.buttonText} >הוספת אירוע</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView >
    );

}

