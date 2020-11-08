import React from 'react';
import {cameraResponseType} from "../../config/types";
import moment from 'moment';
import { Table } from 'antd';

type locationTableProps = {
    data: cameraResponseType[];
    onRowSelect: (data: any)=> void;
}

const LocationTable = (props: locationTableProps) => {
    const columns = [
        {
            title: 'CameraId',
            dataIndex: 'camera_id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (url: string) =>(
                    <img src={url} style={{maxHeight: '60px'}}/>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Latitude',
            dataIndex: 'location',
            render: (location: {latitude: number, longitude:number}) =>(
                <span>{location.latitude}</span>
            )
        },
        {
            title: 'Longtitude',
            dataIndex: 'location',
            render: (location: {latitude: number, longitude:number}) =>(
                <span>{location.longitude}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'timestamp',
            render: (timestamp: string) => (
                <div>
                    {moment(timestamp).format("DD-MM-YYYY, h:mm:ss a")}
                </div>
            ),
        },
    ]
    return (
        <div>
            <Table columns={columns} dataSource={props.data} rowKey='camera_id' onRow={(record, rowIndex) => {
                return {
                    onClick: event => {props.onRowSelect(record)}
                }}}/>
        </div>
    )
}

export default LocationTable;