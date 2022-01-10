import { LinearGradient } from 'expo-linear-gradient'
import React,{useContext, useState, useEffect} from 'react'
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import tailwind from 'tailwind-rn'
import ListJours from '../components/ListJours'
import { BgContext } from '../utils/BgContext'
import { Utils } from '../utils/Utils'

const Home = () => {
    const {background, setBackground} = useContext(BgContext)
    const [forecast, setForecast] = useState(null)
    const [forecastDetail, setForecastDetail] = useState(null)
   

    useEffect(()=> {
    },[])

    

    return (
        <SafeAreaView style={[tailwind("flex-1 py-4 px-2"),{backgroundColor:'#78E0D8'}]}>
            <LinearGradient
            colors={['transparent','rgba(39, 33, 36,0.4)']}
            style={tailwind("absolute top-0 bottom-0 right-0 left-0")}>
                <ScrollView contentContainerStyle={tailwind("flex-1 py-4 justify-center items-center")}
                showsVerticalScrollIndicator={false}>
                    <Text style={[tailwind("font-bold"),{fontSize:70,fontFamily:"dmsBold"}]}>25°</Text>
                    <Text style={{fontFamily:"dmsBold"}}>San Francisco</Text>
                    <ScrollView horizontal contentContainerStyle={tailwind("flex")}
                    showsHorizontalScrollIndicator={false}>
                        <ListJours/>
                    </ScrollView>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Home
