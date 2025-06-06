import React, { JSX } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';

interface BackProps{
    onPress:  () => void;
}

export default function BackButton({onPress}: BackProps): JSX.Element {
    console.log("BackButton()");
    return (
        <View style={[globalStyles.buttonContainer]}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.icon}>↩</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 50,
        borderWidth: 5,
        borderRadius: 25,
        paddingHorizontal: 5,
        paddingBottom: 10,
    }
});
