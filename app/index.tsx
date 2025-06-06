import { Redirect } from 'expo-router';
import React from 'react';

const background = require("../assets/images/bgImg.jpg");
const selectbackground = require("../assets/images/selectX.jpg");


const MainScreen = () => {
    console.log("MainScreen()");

    return <Redirect href="/(tabs)/firstDiary" />;
};

export default MainScreen;
