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
                <Text style={globalStyles.buttonIcon}>↩</Text>
            </TouchableOpacity>
        </View>
    );
}
