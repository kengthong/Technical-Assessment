import axios from 'axios';
import {REVERSE_GEO_API, TEMP_TOKEN, TRAFFIC_API} from "../config/constants";
import {cameraResponseType, trafficResponseType} from "../config/types";

export class TrafficService {
    static async getTrafficInfo(dateTime: string): Promise<trafficResponseType[]> {
        const url = TRAFFIC_API + "?" + new URLSearchParams({
            date_time: dateTime
        });
        const response = await axios.get(url);
        if(response.status == 200){
            return response.data.items;
        } else {
            return [];
        }
    }

    static async getReverseGeo(trafficData: cameraResponseType[]): Promise<any[]> {
        const params = {
            token: TEMP_TOKEN,
            json: '1'
        }
        const promises = trafficData.map((d, idx) => {
            const {latitude, longitude} = d.location;
            return new Promise((resolve, reject) => axios
                .get(REVERSE_GEO_API , {params: {...params, location: latitude+","+longitude}})
                .then(res => resolve(res))
                .catch(err => reject(err)),);
        });
        return await Promise.all(promises);
    }
}