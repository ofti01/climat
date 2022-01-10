import React,{useEffect, useState} from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import tailwind from 'tailwind-rn'
import { Utils } from '../utils/Utils'

const ListJours = ({setSelected}) => {
    
    const [jours, setJours] = useState([])
    const[selected, setItem] = useState(0)
    useEffect(()=>{
        setJours(Utils.getJours())
    },[])
    const setSelectedItem = (index) => {
        setSelected(index)
        setItem(index)
    }
    return(
        <View style={tailwind("flex flex-row")}>
             {jours.map((jour, index)=> {
                return(
                <Pressable key={index} style={tailwind("flex flex-row  p-3 mr-5")} onPress={()=>setSelectedItem(index)}>
                    <Text style={[{fontSize:14,fontFamily:"dmsRegular",color:'#636e72'},index == selected && {fontWeight:'bold',color:'#000'}]}>{jour.nomjour[0].toUpperCase() + jour.nomjour.slice(1).toLowerCase()+', '}</Text>
                    <Text style={[{fontSize:14,fontFamily:"dmsRegular",color:'#636e72'},index == selected && {fontWeight:'bold',color:'#000'}]}>{jour.jour}</Text>
                </Pressable>
                )
            })}
        </View>
    )
}

export default ListJours
