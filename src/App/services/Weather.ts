import axios from "axios";
import {WEATHER_API} from "../config/constants";
import {weatherResponseType} from "../config/types";

export class WeatherService {
    static async getWeatherData(dateTime: string, date: string):Promise<weatherResponseType | null> {
        const url = WEATHER_API + "?" + new URLSearchParams({
            date_time: dateTime,
            date
        });
        const response = await axios.get(url);
        if(response.status == 200){
            return response.data;
        } else {
            return null;
        }
    }
}