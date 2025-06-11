import React, {JSX} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {imageStyles, viewStyles} from '@/styles/globalStyles';
import {bImg} from "@/assets";

interface BackProps{
    onPress:  () => void;
}

export default function BackButton({onPress}: BackProps): JSX.Element {
    console.log("BackButton()");
    return (
        <View style={[viewStyles.backButtonContainer]}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={bImg}
                    style={imageStyles.buttonIcon}
                    resizeMode="contain"
                    accessibilityLabel="Back"
                />
                {/*<Text style={globalStyles.buttonIcon}>↩</Text>*/}
            </TouchableOpacity>
        </View>
    );
}
