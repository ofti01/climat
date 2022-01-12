import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import React,{useContext, useState, useEffect, useRef} from 'react'
import { View, Text, ScrollView, SafeAreaView, Dimensions, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import ListJours from '../components/ListJours'
import Weather from '../components/Weather'
import { BgContext } from '../utils/BgContext'
import { Ionicons } from '@expo/vector-icons'
import { Utils } from '../utils/Utils'
import {OPEN_WEATHER_API_KEY} from "@env"
import HeadCountry from '../components/HeadCountry'
import WeatherDetail from '../components/WeatherDetail'
import CurrentWeather from '../components/CurrentWeather'

const apiKey = OPEN_WEATHER_API_KEY

const WIDTH = Dimensions.get("window").width
const Home = () => {
    const sc = useRef(null)
    const location = useContext(BgContext)
    const [selected, setSelected] = useState(0)
    const [jours, setJours] = useState([])
    const [background, setBackground] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [country, setCountry] = useState(null)

    useEffect( async()=> {
      //  console.log(selected)
        setJours(Utils.getJours())
        getBackgroundColor()
        getForecast()
        getCountry()
    },[selected])

    getCountry = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`
        axios.get(url)
        .then(({data}) => {
            setCountry(data)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    getForecast = async () =>{
        
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
              //  console.log(data.weather[0].icon)
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

    onChange = (nativeEvent) => {
        if(nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if(slide != selected){
                setSelected(slide)
            }
        }
    }
    ChangeSlide = (index) => {
        setSelected(index)
        sc.current.scrollTo({x: WIDTH*index, y: 0, animated: true})
    }

    return (
        <SafeAreaView style={[tailwind("flex-1 py-4 px-2"),{backgroundColor:'#81ecec'}]}>
            {forecast && country ? 
            <LinearGradient
            colors={['transparent','rgba(39, 33, 36,0.4)']}
            style={tailwind("absolute top-0 bottom-0 right-0 left-0")}>
                <ScrollView contentContainerStyle={tailwind("py-4 flex-1 items-center")}
                showsVerticalScrollIndicator={false}>
                    {country && <HeadCountry  {...country}></HeadCountry>}
                    <View style={tailwind("flex w-full")}>
                        <ScrollView
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        ref={sc}
                        scrollTo
                        horizontal
                        contentContainerStyle={"flex justify-center items-center"}
                        style={{width:WIDTH}}>
                            <View style={{width:WIDTH}}>
                                <CurrentWeather {...country}/>
                            </View>
                            {
                                forecast.daily.slice(1,5).map((item)=>{
                                    return(
                                    <View style={{width:WIDTH}} key={item.dt}>
                                        <Weather {...item}/>
                                    </View>
                                )
                            })
                        }

                    </ScrollView>
                    </View>
                    <View style={tailwind("flex h-16 py-2")}>
                        <ScrollView horizontal contentContainerStyle={tailwind("flex")}
                        showsHorizontalScrollIndicator={false}>
                            <View style={tailwind("flex flex-row")}>
             {jours.map((jour, index)=> {
                return(
                <Pressable key={index} style={tailwind("flex flex-row  p-3 mr-5")} onPress={()=>ChangeSlide(index)}>
                    <Text style={[tailwind("text-gray-500"),{fontSize:14,fontFamily:"dmsRegular"},index == selected && {fontWeight:'bold',color:'#000'}]}>{jour.nomjour[0].toUpperCase() + jour.nomjour.slice(1).toLowerCase()+', '}</Text>
                    <Text style={[tailwind("text-gray-500"),{fontSize:15,fontFamily:"dmsRegular",},index == selected && {fontWeight:'bold',color:'#000'}]}>{jour.jour}</Text>
                </Pressable>
                )
            })}
        </View>
                        </ScrollView>
                    </View>
                    <View style={tailwind("flex")}>
                    <ScrollView horizontal contentContainerStyle={tailwind("flex h-48")}
                    showsHorizontalScrollIndicator={false}>
                        <WeatherDetail/>
                    </ScrollView>
                    </View>
                </ScrollView>
            </LinearGradient>:<></>}
        </SafeAreaView>
    )
}

export default Home
