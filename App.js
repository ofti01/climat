import React,{useState} from 'react'
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Content from './src/screens/Content';

const asyncRessources = async () => {
  try {
    await Font.loadAsync({
      'dmsBold': require('./src/assets/fonts/DMSans-Bold.ttf'),
      'dmsMedium': require('./src/assets/fonts/DMSans-Medium.ttf'),
      'dmsRegular': require('./src/assets/fonts/DMSans-Regular.ttf'),
    })
  }
  catch(e){
    console.log(e.error)
  }
}
export default function App() {
  
  const [isReady, setIsReady] = useState(false)

    if( !isReady) {
        return <AppLoading onFinish={() => setIsReady(true)}
                       startAsync={asyncRessources}
                       onError={e => console.log(e)} />
    }
    return (
        <>
            <Content/>
        </>
    )
}