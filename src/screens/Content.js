import React,{useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import * as Location from 'expo-location';
import {OPEN_WEATHER_API_KEY} from "@env"
import axios from "axios";
import tailwind from 'tailwind-rn';
import { BgContext } from '../utils/BgContext';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Search from './Search';
import { NavigationContainer } from '@react-navigation/native';
const apiKey = OPEN_WEATHER_API_KEY;

const Stack = createStackNavigator()
const Content = () => {
    const [background, setBackground] = useState(null)

    useEffect(async()=> {
        try {
            let {status} = await Location.requestForegroundPermissionsAsync()
            if ( status !== "granted") {
                Alert.alert("Permission to access location was denied")
                return
            }
            let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
            console.log(apiKey)
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`;
            axios.get(url)
            .then(({ data }) => {
                console.log(data.weather[0].icon)
                setBackground(data.weather[0].icon)
                })
            .catch((error) => {
                Alert.alert(error.message);
            });
        }
        catch(e){
            console.log(e.error)
        }
    },[])
    if(!background) {
        return(
            <View style={tailwind("flex-1 justify-center items-center")}>
                <Text>loading ...</Text>
            </View>
        )
    }
    return (
        <BgContext.Provider value={background, setBackground}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen name="Home" component={Home}></Stack.Screen>
                    <Stack.Screen name="Search" component={Search}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </BgContext.Provider>
    )
}

export default Content
