import {StyleSheet, TextStyle} from 'react-native';


export const colors = {
    primary: '#4630EB',
    secondary: '#000020',
    accent: '#F3534A',
    background: '#f0f0f0',
    text: '#101010',
    textLight: '#606060',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#4CD964',
};

export const typography = {
    fontSizes: {
        small: 12,
        medium: 16,
        large: 20,
        xlarge: 24,
        xxlarge: 30,
    },
    fontWeights: {
        regular: 'normal',
        medium: '500',
        bold: 'bold',
    },
};

export const spacing = {
    xs: 2,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const globalStyles = StyleSheet.create({
    // RTL specific styles
    rtlContainer: {
        flexDirection: 'row-reverse',
    },
    rtlText: {
        textAlign: 'right',
        writingDirection: 'rtl',
    },

    container: {
        flex: 1,
        padding: spacing.m,
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    view: {
        borderColor: '#000020',
        width: '100%',
        marginBottom: 16,
    },
    scrollView: {
        borderColor: '#000020',
        width: '100%',
        marginBottom: 5,
    },
    heading: {
        textAlign: 'right',
        writingDirection: 'rtl',
        fontSize: typography.fontSizes.xlarge,
        fontWeight: 'bold' as TextStyle['fontWeight'],
        color: colors.primary,
        marginBottom: spacing.m,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 8
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
        height: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
        borderRadius: 4,
    },

    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    button: {
        backgroundColor: colors.primary,
        margin: spacing.xs,
        padding: spacing.s,
        width: '70%',
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: colors.white,
        fontWeight: 'medium' as TextStyle['fontWeight'],

    },
    backButtonContainer: {
        width: 58,
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonIcon: {
        width: 58,
        height: 58,
    },


    modalContent:{
        flex:1,
        alignItems: 'stretch',
        borderWidth: 1,
        borderColor: '#010000',
        backgroundColor: '#000',
},
    card: {
        borderWidth: spacing.xs,
        borderColor: colors.textLight,
        textAlign: 'right',
        writingDirection: 'rtl',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.m,
        marginVertical: spacing.s,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
        elevation: 3,
    },
    infoItem: {
        flexDirection: 'row-reverse',
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-start',

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        width: 80,
    },
    value: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    link: {
        fontSize: typography.fontSizes.xlarge,
        color: '#007AFF',
        textDecorationLine: 'underline',
        paddingEnd: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    selectbackground:{
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modelOpener: {

        alignItems: 'center',
        fontSize : typography.fontSizes.xxlarge,
        fontWeight: 'bold',

    },
});
