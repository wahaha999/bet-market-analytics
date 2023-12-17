import React, { useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import '../styles/pieChart.css';

interface BarChartDataType {
    label: string;
    value: number;
}

interface DataItemType {
    client_name: string;
    client_sum: number;
    percent: number;
}

interface ResponseDataType {
    results: DataItemType[]
}

charts(FusionCharts);

const MyBarChart: React.FC = () => {
    const [data, setData] = useState<BarChartDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = (url: string) => {
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            });
    };

    useEffect(() => {
        loadData("http://144.172.74.54:5000/dimension/client")
            .then((dataRes: ResponseDataType) => {
                const transformedData = dataRes.results
                    .map((item: DataItemType) => ({
                        label: item.client_name,
                        value: item.client_sum
                    }));

                setData(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error loading data:", error);
                setError(error.toString());
                setLoading(false);
            });
    }, []);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const dataSource = {
        chart: {
            caption: "Countries With Most Oil Reserves [2017-18]",
            subcaption: "In MMbbl = One Million barrels",
            xaxisname: "Client",
            yaxisname: "Reserves (MMbbl)",
            theme: "candy"
        },
        data
    };

    return (
        <ReactFusioncharts
            type="column2d"
            width="600"
            height="500"
            dataFormat="json"
            dataSource={dataSource}
        />
    );
};

export { MyBarChart };