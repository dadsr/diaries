import {JSX} from "react";
import {ImageBackground, Linking, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {bgImg} from "@/assets";

export default function About(): JSX.Element {
    console.log("About()");
    const phoneNumber = '+972-52-841-4130';
    const email = 'yael.chapal@gmail.com';
    const insets = useSafeAreaInsets();


    const handlePhonePress = () => {
        console.log("handlePhonePress()");
        Linking.openURL(`tel:${phoneNumber}`);
    };

    // Function to handle email
    const handleEmailPress = () => {
        console.log("handleEmailPress()");
        Linking.openURL(`mailto:${email}`);
    };

    return (
        <ImageBackground
            source={bgImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
            <SafeAreaView  style = {[globalStyles.container, {
                paddingTop: Math.max(insets.top + 50,20),
                paddingBottom: Math.max(insets.bottom - 25,20)}]}>

                <Text style={globalStyles.heading}>יעל צפאל מאמנת רגשית NLP</Text>
                <View style={globalStyles.infoItem}>
                    <Text style={globalStyles.text}>מאמנת רגשית להצלחה, הגשמה וצמיחה אישית.
                        בעלת קליניקה פרטית
                        מעבירה הרצאות וסדנאות
                        מרצה ל NLP
                    </Text>
                </View>

                <View style={globalStyles.infoItem}>
                    <Text style={globalStyles.text}> טלפון נייד: </Text>
                    <TouchableOpacity onPress={handlePhonePress}>
                        <Text style={[globalStyles.link]}>{phoneNumber}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.infoItem}>
                    <Text style={globalStyles.text}> מייל: </Text>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Text style={[globalStyles.link]}>{email}</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ImageBackground>

    );

}
