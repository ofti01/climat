import React,{useState, useEffect} from 'react'
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Content from './src/screens/Content';
import { BgContext } from './src/utils/BgContext';
import { Alert, View ,Text} from 'react-native';
import tailwind from 'tailwind-rn';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null)

  useEffect(async() => {
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
      let location = await Location.getCurrentPositionAsync({ accuracy: 6 })
      console.log(location)
      setLocation(location)
    }
    catch(e){
      console.log(e.error)
    }
  }, [])
  if(!location) {
    return(
        <View style={tailwind("flex-1 justify-center items-center")}>
            <Text>loading ...</Text>
        </View>
    )
}
    return (
        <BgContext.Provider value={location}>
            <Content/>
        </BgContext.Provider>
    )

}