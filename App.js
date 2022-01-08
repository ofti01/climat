import React,{useState} from 'react'
import { View, Text } from 'react-native'
import AppLoading from "expo-app-loading";
import axios from "axios";
import * as Font from 'expo-font';
import { Utils } from './src/utils/Utils';
import * as Location from 'expo-location';
import {OPEN_WEATHER_API_KEY} from "@env"

const apiKey = OPEN_WEATHER_API_KEY;
const initialApp = async () => {
    try {
      await Font.loadAsync({
        'dmsBold': require('./src/assets/fonts/DMSans-Bold.ttf'),
        'dmsMedium': require('./src/assets/fonts/DMSans-Medium.ttf'),
        'dmsRegular': require('./src/assets/fonts/DMSans-Regular.ttf'),
      })
      let {status} = await Location.requestForegroundPermissionsAsync()
      if ( status !== "granted") {
        Alert.alert("Permission to access location was denied")
        return
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
      console.log(apiKey)
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&lang=fr&appid=${apiKey}&units=metric`;
      axios.get(url)
          .then(({ data }) => {
            console.log(data.weather[0].icon)
          })
          .catch((error) => {
            Alert.alert(error.message);
        });
      } 
      catch (e) {
        console.log(e)
    }
}
export default function App() {
  
  const [isReady, setIsReady] = useState(false)
  const [location,setLocation] = useState(null)

    if( !isReady) {
        return <AppLoading onFinish={() => setIsReady(true)}
                       startAsync={initialApp}
                       onError={e => console.log(e)} />
    }
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}