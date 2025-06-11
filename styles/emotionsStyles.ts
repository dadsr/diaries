
import {StyleSheet} from 'react-native';
import {typography, colors} from "@/styles/globalStyles";

export const emotionsStyles = StyleSheet.create({
    selectorContainer: {
        margin: 5,
        borderWidth:1,
        borderRadius: 8,
        borderColor:'#000',
        backgroundColor: colors.background,
    },

    multiSelectWrapper: {
        zIndex: 1000,
        borderColor:'#000',
    },
    multiSelect:{
    },
    multiSelectContainer: {
        height: 50,
        borderColor: '#060000',
        borderWidth: 1,
        paddingHorizontal: 12,
        backgroundColor: 'white',
        textAlign: 'right',
    },
    multiSelectPlaceholder: {
        fontSize: typography.fontSizes.large,
        color: colors.text,
    },

    multiSelectSelectedText: {
        fontSize: typography.fontSizes.large,
        color: colors.text,
        textAlign: 'right',
    },

    multiSelectSearch: {
        height: 50,
        fontSize: typography.fontSizes.large,
        textAlign: 'right',

    },
    multiSelectIcon: {
        width: 20,
        height: 20,

    },
    multiSelectItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: colors.background,
    },
    multiSelectItemText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
    },
    select:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        writingDirection:"rtl",
    },
    sliderWithMarkings: {
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        marginVertical: 10,
        zIndex: 1,
    },
    markingsContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        height: 30,
        zIndex: 1,
        pointerEvents: 'none',

    },
    sliderMark: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateX: -5 }],
    },
    markLine: {
        width: 1,
        height: 6,
        backgroundColor: '#666',
        marginBottom: 2,
    },
    markLabel: {
        fontSize: 8,
        color: '#666',
        textAlign: 'center',
        minWidth: 10,
    },

    slider: {
        width: '100%',
        height: 40,
        zIndex: 2,
    },

    sliderContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 5,
        zIndex: 1,
        backgroundColor: colors.background,
    },

    emotionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'right',
    },

    intensityValue: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
    },
});
