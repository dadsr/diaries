import {JSX} from "react";
import {ImageBackground, Linking, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {colors, imageStyles, spacing, textStyles, typography, viewStyles} from "@/styles/globalStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {aboutImg} from "@/assets";

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
            source={aboutImg}
            style={imageStyles.background}
            resizeMode="cover"
        >
            <SafeAreaView  style = {[viewStyles.container, {
                paddingTop: Math.max(insets.top + 50,20),
                paddingBottom: Math.max(insets.bottom - 25,20)}]}>

                <Text style={[
                    {
                        textAlign: 'center',
                        writingDirection: 'rtl',
                        fontSize: typography.fontSizes.xxlarge,
                        fontWeight: typography.fontWeights.bold,
                        color: colors.primary,
                        marginBottom: spacing.m,}]}>יעל צ'אפל מאמנת רגשית NLP</Text>
                <View style={viewStyles.card}>
                    <Text style={textStyles.text}>מאמנת רגשית להצלחה, הגשמה וצמיחה אישית.
                        בעלת קליניקה פרטית
                        מעבירה הרצאות וסדנאות
                        מרצה ל NLP
                    </Text>
                </View>

                <View style={viewStyles.card}>
                    <Text style={textStyles.text}> טלפון נייד: </Text>
                    <TouchableOpacity onPress={handlePhonePress}>
                        <Text style={[textStyles.link]}>{phoneNumber}</Text>
                    </TouchableOpacity>
                </View>
                <View style={viewStyles.card}>
                    <Text style={textStyles.text}> מייל: </Text>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Text style={[textStyles.link]}>{email}</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ImageBackground>

    );

}
