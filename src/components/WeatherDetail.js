import React from 'react'
import { View, Text, Image } from 'react-native'
import tailwind from 'tailwind-rn'

const WeatherDetail = () => {
    const details =[
        {
            id:1,
            temp:28
        },
        {
            id:2,
            temp:28
        },
        {
            id:3,
            temp:28
        },
        {
            id:4,
            temp:28
        },
    ]
    return (
        <View style={tailwind("flex flex-row")}>
            {details.map((detail,index)=> {
                return(
                    <View style={[{backgroundColor:'rgba(255,255,255,.4)'},tailwind("flex justify-center items-center rounded-lg flex-col  w-28 h-36  mx-3")]} key={index}>
                        <Text>15:00</Text>
                        <Image source={require('./../assets/images/rain.png')} style={tailwind("w-12 h-12 mt-2")}/>
                        <Text style={tailwind("mt-2 text-xl font-bold ")}>{detail.temp}°</Text>
                    </View>
                )
            })}
        </View>
    )
}

export default WeatherDetail
