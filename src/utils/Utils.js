import * as Location from "expo-location";
import { Alert } from "react-native";
import {OPEN_WEATHER_API_KEY} from "@env"
import axios from "axios";

const apiKey = OPEN_WEATHER_API_KEY;
const brgs = [{
    id:"01d",
    first:"#DAE9F6",
    second:"#FFF"
},{
    id:"03d",
    first:"#679ED9",
    second:"#02072E"
}]
export class Utils {
    
    static getCoords = async () => {
        try {
            const {status} = Location.requestForegroundPermissionsAsync()
            if ( status !== "granted") {
                Alert.alert("Permission to access location was denied")
                return
            }
            let {
                coords: { latitude, longitude }
            } = await Location.getCurrentPositionAsync({ accuracy: 6 });
            const coords = { latitude, longitude };
            return coords;
        }
        catch(e) {
            console.log(e.error)
        }
    }

    static getCurrentIcon = async ({longitude, latitude}) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=${apiKey}&units=metric`;
        axios.get(url)
          .then(({ data }) => {
            return data
          })
          .catch((error) => {
            Alert.alert(error.message);
        });

    }

    static getJours() {
        let jours = []
        for (let i = 0; i < 5; i++) {
            let date = new Date();
            date.setDate(date.getDate()+i)
            let kk = {}
            if ( i==0 ) kk ={
                nomjour: 'Aujoud\'hui',
                jour: date.getDate()
            }
            else kk ={
                nomjour: ''+date.toLocaleString('fr-FR', {  weekday: 'long' }),
                jour: date.getDate()
            }
            jours.push(kk)

        }
        return jours;

    }
}