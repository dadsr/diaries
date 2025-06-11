import {JSX, useCallback, useState} from "react";
import {Case} from "@/models/Case";
import services from "@/services/Services";
import {router, useFocusEffect} from "expo-router";
import {SafeAreaView, ScrollView as DefaultScrollView, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles";

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
            <SafeAreaView  style = {[globalStyles.container, {
                paddingTop: Math.max(insets.top + 8,20),
                paddingBottom: Math.max(insets.bottom - 25,20)}]}>

                <Text style = {globalStyles.heading}>רשימת אירועים:</Text>
                <DefaultScrollView  style = {globalStyles.scrollView}>
                    {cases.length > 0 ?(
                        cases.map(c => <CaseCard key={c.id} diary={diary} case={c} onDelete={handleCaseDeleted} />)
                    ): (
                        <View style = {globalStyles.card}>
                            <Text style={globalStyles.text}>לא נמצאו אירועים.</Text>
                            <Text style={globalStyles.text}>לחץ על הוספת אירוע כדי להתחיל.</Text>
                        </View>
                    )}
                </DefaultScrollView >

                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={addNewCase}>
                        <Text style={globalStyles.buttonText} >הוספת אירוע</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView >
    );

}

