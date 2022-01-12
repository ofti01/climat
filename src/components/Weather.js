import React,{useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { Ionicons } from '@expo/vector-icons'
import { Utils } from '../utils/Utils'
const Weather = (forecast) => {
    useEffect(() => {
        console.log(forecast)
    }, [])
    return (
        <View style={tailwind("flex flex-col pt-4 justify-center items-center w-full")}>
            <Image source={Utils.getSourceWeather(forecast.weather[0].icon)} style={tailwind("w-40 h-40")}/>
            <Text style={[tailwind("text-gray-600 mt-4"),{fontFamily:'dmsRegular',fontWeight:'600',fontSize:18}]}>{forecast.weather[0].description}</Text>
            <Text style={{fontFamily:'dmsBold',fontWeight:'700',fontSize:56, marginTop:3}}>{Math.round(forecast.temp.max)}°</Text>
            <View style={tailwind("flex flex-row my-2")}>
                <View style={tailwind("flex flex-row mr-8")}>
                    <Ionicons name="ios-stopwatch-outline" size={18} />
                    <Text style={[tailwind("ml-2 text-gray-600"),{fontFamily:'dmsRegular',fontSize:14,}]}>{forecast.wind_speed} km/h</Text>
                </View>
                
                <View style={tailwind("flex flex-row")}>
                    <Ionicons name="ios-thermometer" size={18}/>
                    <Text style={[tailwind("ml-2 text-gray-600"),{fontFamily:'dmsRegular',fontSize:14,}]}>{forecast.humidity} %</Text>
                </View>
            </View>
        </View>
    )
}

export default Weather
