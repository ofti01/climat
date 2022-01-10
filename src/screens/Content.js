import React,{useState, useEffect} from 'react'
import { View, Text, Alert } from 'react-native'
import * as Location from 'expo-location';
import {OPEN_WEATHER_API_KEY} from "@env"
import axios from "axios";
import tailwind from 'tailwind-rn';
import { BgContext } from '../utils/BgContext';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator()
const Content = () => {
    
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Search" component={Search}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    )
}


export default Content

