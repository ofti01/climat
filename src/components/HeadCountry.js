import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import tailwind from 'tailwind-rn'

const HeadCountry = (country) => {
    return (
        <View style={tailwind("flex h-20 pt-10 flex-row justify-between items-center w-full px-4")}>
            <View style={tailwind("flex flex-row items-center")}>
                <Ionicons name='ios-location-sharp' size={26} style={tailwind("pb-2 mr-3")}/>
                <Text style={{fontWeight:'bold',fontSize:20,fontFamily:'dmsBold'}}>{country.name}, {country.sys.country}</Text>
            </View>
            <Ionicons name='ios-search-circle-outline' size={28} style={tailwind("pb-2")}/>
        </View>
    )
}

export default HeadCountry
