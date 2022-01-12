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

    static getSourceWeather = (icon) => {
        let source='';
      switch(icon){
        case '01d': source = require('./../assets/images/weathers/01d.png');break;
        case '01n': source = require('./../assets/images/weathers/01n.png');break;
        case '02d': source = require('./../assets/images/weathers/02d.png');break;
        case '02n': source = require('./../assets/images/weathers/02n.png');break;
        case '03d': source = require('./../assets/images/weathers/03d.png');break;
        case '03n': source = require('./../assets/images/weathers/03d.png');break;
        case '04d': source = require('./../assets/images/weathers/04d.png');break;
        case '04n': source = require('./../assets/images/weathers/04d.png');break;
        case '09d': source = require('./../assets/images/weathers/09d.png');break;
        case '09n': source = require('./../assets/images/weathers/09d.png');break;
        case '10d': source = require('./../assets/images/weathers/10d.png');break;
        case '10n': source = require('./../assets/images/weathers/10d.png');break;
        case '11d': source = require('./../assets/images/weathers/11d.png');break;
        case '11n': source = require('./../assets/images/weathers/11d.png');break;
        case '13d': source = require('./../assets/images/weathers/13d.png');break;
        case '13n': source = require('./../assets/images/weathers/13d.png');break;
        case '50d': source = require('./../assets/images/weathers/50d.png');break;
        case '50n': source = require('./../assets/images/weathers/50d.png');break;
      }
      return source;
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