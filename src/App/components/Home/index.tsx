import React, {useState} from 'react';
import { DatePicker, message, Space, TimePicker } from 'antd';
import {TrafficService} from "../../services/Traffic";
import moment from "moment";
import LocationTable from "./LocationTable";
import {
    cameraResponseType,
    cameraTableDataType,
    reverseGeoData,
    trafficResponseType,
    weatherResponseType
} from "../../config/types";
import {WeatherService} from "../../services/Weather";
import {Utility} from "../../config/utility";

const HomeComponent = () => {
    const initialMoment = moment();
    const [date, setDate] = useState(initialMoment);
    const [cameraData, setCameraData] = useState<cameraTableDataType[]>([]);
    const [activeSS, setActiveSS] = useState<string>("");
    const [activeFC, setActiveFC] = useState<{area: string, forecast: string}>();
    const [weatherData, setWeatherData] = useState<weatherResponseType | null>();

    const getTrafficWeatherData = async(dateTime: string, date: string) => {
        const trafficData: trafficResponseType[] = await TrafficService.getTrafficInfo(dateTime);
        const wData: weatherResponseType | null = await WeatherService.getWeatherData(dateTime, date);
        if(trafficData.length>0 && wData) {
            setCameraData(trafficData[0].cameras)
            const geoData: reverseGeoData[] = await TrafficService.getReverseGeo(trafficData[0].cameras);
            const camerasWName = trafficData[0].cameras.map( (d,i) => {
                return {
                    ...d,
                    name: geoData[i].data.GeocodeInfo[0] && geoData[i].data.GeocodeInfo[0].ROAD || ""
                }
            })
            setCameraData(camerasWName)
        }
        setWeatherData(wData);
    }

    const onLocationSelect = (rowData: cameraResponseType) => {
        setActiveSS(rowData.image)
        if(weatherData) {
            const nearestAreaIndex = Utility.getNearestAreaIndex({
                latitude: rowData.location.latitude,
                longitude: rowData.location.longitude
            }, weatherData.area_metadata)
            const activeForeCast = weatherData.items[0].forecasts[nearestAreaIndex];
            setActiveFC(activeForeCast)
        } else {
            message.error("Unable to load location's weather")
        }
    }
    const handleDateChange = (val: moment.Moment | null) => {
        if(val) {
            let newMoment = date;
            newMoment.date(val.date());
            newMoment.month(val.month());
            newMoment.year(val.year());
            setDate(newMoment);
            getTrafficWeatherData(newMoment.format(), newMoment.format("YYYY-MM-DD"));
        }
    }

    const handleTimeChange = (val: any) => {
        if(val) {
            let newMoment = date;
            newMoment.second(val.second());
            newMoment.minute(val.minute());
            newMoment.hour(val.hour());
            setDate(newMoment);
            getTrafficWeatherData(newMoment.format(), newMoment.format("YYYY-MM-DD"));
        }
    }

    return (
        <div className="col">
            <div className="row">
                <div className="col-24 col-lg-9" style={{display:"flex", flexWrap: "wrap", marginBottom: '20px'}}>
                    <div className="col-lg-6 col-12">
                        <Space direction="vertical">
                            <DatePicker onChange={handleDateChange}/>
                        </Space>
                    </div>
                    <div className="col-lg-6 col-12">
                        <Space direction="vertical">
                            <TimePicker onChange={handleTimeChange} />
                        </Space>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-9">
                    <LocationTable data={cameraData} onRowSelect={onLocationSelect}/>
                </div>

                <div className="col-lg-3 col-12">
                    {activeFC?
                        <div className='flex-col'>
                            <span style={{fontSize: '24px', fontWeight: "bold"}}>{activeFC?.area}</span>
                            <span>{activeFC?.forecast}</span>
                        </div>
                        :
                    null
                    }
                </div>
            </div>

            <div className="row">

                <div className="col-24 col-lg-9">
                    {activeSS !==""?
                    <img src={activeSS} />
                    :
                    null
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;