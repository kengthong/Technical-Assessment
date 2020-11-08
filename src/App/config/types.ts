export type trafficResponseType = {
    cameras: cameraResponseType[];
    timeStamp: "string"
}

export type areaMetaDataType = {
    name: string;
    label_location: {
        latitude: number;
        longitude: number;
    }
}

export type cameraResponseType = {
    camera_id: string;
    image: string;
    image_metadata: {
        height: number;
        md5: string;
        width: number;
    }
    location: {
        latitude: number;
        longitude: number;
    }
    timestamp: string;
}

export type cameraTableDataType = cameraResponseType & {
    name?: string;
}

export type weatherResponseType = {
    area_metadata: areaMetaDataType[],
    items: {
        update_timestamp: string;
        timestamp: string;
        valid_period: {
            start: string;
            end: string;
        },
        forecasts: {
            area: string;
            forecast: string;
        }[]
    }[],
    api_info: {
        status: string;
    }

}

export type reverseGeoData = {
    data: {
        GeocodeInfo: {
            LATITUDE: string;
            LONGITUDE: string;
            LONGTITUDE: string;
            ROAD: string;
            XCOORD: string;
            YCOORD: string;
        }[]
    }
}