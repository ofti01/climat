import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import React,{useContext, useState, useEffect} from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn'
import ListJours from '../components/ListJours'
import Weather from '../components/Weather'
import { BgContext } from '../utils/BgContext'

import { Utils } from '../utils/Utils'
import {OPEN_WEATHER_API_KEY} from "@env"

const apiKey = OPEN_WEATHER_API_KEY
const Home = () => {
    const location = useContext(BgContext)
    const [selected, setSelected] = useState(0)
    const [background, setBackground] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [country, setCountry] = useState(null)
    
    useEffect( async()=> {
        getBackgroundColor()
        getForecast(location)
        getCountry(location)
    },[])

    getCountry = (location) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`
        axios.get(url)
        .then(({data}) => {
            setCountry(data.name)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    getForecast = (location) =>{
        
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric&exclude=minutely`
        axios.get(url)
        .then(({data}) => {
            setForecast(data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }
    getBackgroundColor= async() => {
        try {
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
        catch(e) {
            console.log(e.error())
        }
    }

    

    return (
        <SafeAreaView style={[tailwind("flex-1 py-4 px-2"),{backgroundColor:'#78E0D8'}]}>
            <LinearGradient
            colors={['transparent','rgba(39, 33, 36,0.4)']}
            style={tailwind("absolute top-0 bottom-0 right-0 left-0")}>
                <ScrollView contentContainerStyle={tailwind("py-4 flex-1  items-center")}
                showsVerticalScrollIndicator={false}>
                    <Text>{country}</Text>
                    {forecast && <Weather {...forecast}/>}
                    <Text style={{fontFamily:"dmsBold"}}>San Francisco</Text>
                    <View style={tailwind("flex h-16 py-2")}>
                    <ScrollView horizontal contentContainerStyle={tailwind("flex")}
                    showsHorizontalScrollIndicator={false}>
                        <ListJours setSelected={setSelected}/>
                    </ScrollView>
                    </View>
                    <Text>{selected} léléél</Text>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Home
