import {areaMetaDataType, weatherResponseType} from "./types";

export class Utility {

    static getNearestAreaIndex(position: {latitude: number, longitude: number}, weatherList:areaMetaDataType[]): number {
        let minDif = 99999;
        let closest = 0;

        weatherList.forEach( (d, index) => {
            var dif = Utility.PythagorasEquirectangular(
                position.latitude,
                position.longitude,
                weatherList[index].label_location.latitude,
                weatherList[index].label_location.longitude
            );
            if (dif < minDif) {
                closest = index;
                minDif = dif;
            }
        })

        return closest;
    }

    // Convert Degress to Radians
    private static Deg2Rad(deg:number ) {
        return deg * Math.PI / 180;
    }

    private static PythagorasEquirectangular(lat1:number, lon1:number, lat2:number, lon2:number) {
        lat1 = Utility.Deg2Rad(lat1);
        lat2 = Utility.Deg2Rad(lat2);
        lon1 = Utility.Deg2Rad(lon1);
        lon2 = Utility.Deg2Rad(lon2);
        const R = 6371; // km
        const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        const y = (lat2 - lat1);
        const d = Math.sqrt(x * x + y * y) * R;
        return d;
    }
}