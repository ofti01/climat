import React,{useEffect} from 'react'
import { View, Text } from 'react-native'

const Weather = (forecast) => {
    useEffect(() => {
        console.log(forecast.daily.slice(0,1))
    }, [])
    return (
        <View>
            <Text>foreact</Text>
        </View>
    )
}

export default Weather
