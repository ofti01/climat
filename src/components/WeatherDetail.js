
import React,{useEffect ,useState, useRef} from 'react'
import { View, Text, Image, Animated } from 'react-native'
import tailwind from 'tailwind-rn'
import {Utils} from './../utils/Utils'

const WeatherDetail = (item) => {
    const [refresh, SetRefresh] = useState(false)
    const ref = useRef(new Animated.ValueXY({x:0,y:15})).current
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
    
    useEffect(() => {
       Animated.spring(ref,{
           toValue:{x:0,y:0},
           useNativeDriver:true
       }).start()
    }, [item])
    if(!item) {
        return(<></>)
    }
    return (
        <Animated.View style={[tailwind("flex flex-row"),{transform:[{translateY:ref.y}]}]}>
                    <View style={[{backgroundColor:'rgba(255,255,255,.3)'},tailwind("flex justify-center items-center rounded-lg flex-col  w-28 h-36  mx-3")]}>
                        <Text style={tailwind('text-gray-500 mb-2')}>15:00</Text>
                        <Image source={Utils.getSourceWeatherDetail(item.weather[0].icon)} style={[tailwind("w-12 h-12 mb-2"),{tintColor:'#fff'}]}/>
                        <Text style={tailwind("m-2 text-xl font-bold ")}>{Math.round(item.main.temp)}°</Text>
                    </View>
        </Animated.View>
    )
}

export default WeatherDetail
