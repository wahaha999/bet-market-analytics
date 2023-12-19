import React, { useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import '../styles/pieChart.css';
import Loading from './Loading';
import { API_URL } from '../constant';

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
        loadData(`${API_URL}/dimension/client`)
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


    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;

    const dataSource = {
        chart: {
            caption: "BET TREND by Client",
            subcaption: "Who bets most?",
            xaxisname: "Client",
            yaxisname: "Bet Trend",
            theme: "candy",
            captionFont: "Verdana",
            captionFontSize: "16",
            subCaptionFont: "Verdana",
            subCaptionFontSize: "14"
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

export default MyBarChart;