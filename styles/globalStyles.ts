import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4630EB',
    secondary: '#000020',
    accent: '#f7fd04',
    background: '#f0f0f0',
    text: '#101010',
    textLight: '#606060',
    white: 'rgb(255,255,255)',
    whiteOpa: 'rgba(255,255,255,0.22)',
    black: '#000000',
    error: '#FF3B30',
    success: '#4CD964',
    border: '#000',
    link: '#0d0084',
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
        regular: 'normal' as 'normal',
        medium: '500',
        bold: 'bold' as 'bold',
    },
};

export const spacing = {
    xxs: 1,
    xs: 2,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};


export const viewStyles = StyleSheet.create({
    rtlContainer: {
        flexDirection: 'row-reverse',
    },
    container: {
        flex: 1,
        padding: spacing.m,
    },
    view: {
        borderColor: colors.border,
        width: '100%',
        marginBottom: spacing.m,
    },
    scrollView: {
        borderColor: colors.border,
        width: '100%',
        marginBottom: spacing.s,
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
        borderWidth: spacing.xxs,
        borderRadius: 15,
        borderColor: colors.accent,
        alignItems: 'center',
    },
    backButtonContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        flex: 1,
        alignItems: 'stretch',
        borderWidth: spacing.xs,
        borderColor: colors.border,
        backgroundColor: colors.background,
    },
    card: {
        borderWidth: spacing.xs,
        borderColor: colors.textLight,
        backgroundColor: colors.whiteOpa,
        borderRadius: 8,
        padding: spacing.m,
        marginVertical: spacing.s,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    infoItem: {
        flexDirection: 'row-reverse',
        marginTop: spacing.l,
        marginBottom: spacing.l,
        alignItems: 'flex-start',
    },
    input: {
        borderWidth: spacing.xs,
        borderColor: colors.border,
        padding: spacing.s,
        marginVertical: spacing.s,
        borderRadius: 4,
    },
    textarea: {
        borderWidth: spacing.xs,
        borderColor: colors.border,
        padding: spacing.s,
        marginVertical: spacing.s,
        borderRadius: 4,
        height: 100,
        backgroundColor: colors.white,
    },
    selectbackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    modalOpener: {
        alignItems: 'center',
    },
});


export const textStyles = StyleSheet.create({
    rtlText: {
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    error: {
        color: colors.error,
        marginBottom: spacing.s,
    },
    heading: {
        textAlign: 'right',
        writingDirection: 'rtl',
        fontSize: typography.fontSizes.xlarge,
        fontWeight: typography.fontWeights.bold,
        color: colors.primary,
        marginBottom: spacing.m,
    },
    text: {
        fontSize: typography.fontSizes.medium,
        fontWeight: typography.fontWeights.bold,
        marginBottom: spacing.s,
        textAlign: 'right',
        color: colors.text,
        backgroundColor: colors.whiteOpa,
    },
    inputText: {
        fontSize: typography.fontSizes.medium,
        fontWeight: typography.fontWeights.bold,
        marginBottom: spacing.s,
        textAlign: 'right',
        color: colors.text,
        backgroundColor: colors.white,
        borderWidth: spacing.xs,
        borderColor: colors.border,
        padding: spacing.s,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'right',
        writingDirection: 'rtl',
        color: colors.white,
        fontWeight: typography.fontWeights.bold,
    },
    label: {
        fontSize: typography.fontSizes.medium,
        fontWeight: typography.fontWeights.bold,
        color: colors.text,
        width: 80,
    },
    value: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    link: {
        fontSize: typography.fontSizes.xlarge,
        color: colors.link,
        textDecorationLine: 'underline',
        paddingEnd: spacing.s,
    },
    modalOpener: {
        fontSize: typography.fontSizes.xxlarge,
        fontWeight: typography.fontWeights.bold,
    },
});

export const imageStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    buttonIcon: {
        width: 60,
        height: 60,
    },
});
