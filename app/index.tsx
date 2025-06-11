import { Redirect } from 'expo-router';
import React from 'react';


const MainScreen = () => {
    console.log("MainScreen()");

    return <Redirect href="/(tabs)/firstDiary" />;
};

export default MainScreen;
