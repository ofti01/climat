import React,{useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import tailwind from 'tailwind-rn'
import { Ionicons } from '@expo/vector-icons'

const Weather = (forecast) => {
    useEffect(() => {
        console.log(forecast)
    }, [])
    return (
        <View style={tailwind("flex flex-col pt-4 justify-center items-center w-full")}>
            <Image source={require('./../assets/images/rain.png')} style={tailwind("w-44 h-44")}/>
            <Text style={[tailwind("text-gray-600"),{fontFamily:'dmsRegular',fontWeight:'600',fontSize:18, marginTop:4}]}>Cloudy</Text>
            <Text style={{fontFamily:'dmsBold',fontWeight:'700',fontSize:56, marginTop:3}}>24°</Text>
            <View style={tailwind("flex flex-row my-2")}>
                <View style={tailwind("flex flex-row mr-8")}>
                    <Ionicons name="ios-stopwatch-outline" size={18} />
                    <Text style={[tailwind("ml-2 text-gray-600"),{fontFamily:'dmsRegular',fontSize:14,}]}>3.2</Text>
                </View>
                
                <View style={tailwind("flex flex-row")}>
                    <Ionicons name="ios-thermometer" size={18}/>
                    <Text style={[tailwind("ml-2 text-gray-600"),{fontFamily:'dmsRegular',fontSize:14,}]}>76 %</Text>
                </View>
            </View>
        </View>
    )
}

export default Weather
