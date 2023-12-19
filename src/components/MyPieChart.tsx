import React, { useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import '../styles/pieChart.css';
import Loading from './Loading';
import { API_URL } from '../constant';

interface PieDataType {
    label: string;
    value: number;
}

interface DataItemType {
    country: string;
    country_sum: number;
    percent: number;
}

interface ResponseDataType {
    results: DataItemType[]
}

charts(FusionCharts);

const MyPieChart: React.FC = () => {
    const [data, setData] = useState<PieDataType[]>([]);
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
        loadData(`${API_URL}/dimension/country`)
            .then((dataRes: ResponseDataType) => {
                const transformedData = dataRes.results
                    .map((item: DataItemType) => ({
                        label: item.country,
                        value: item.country_sum
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
            caption: "2023 NBA BET TREND by Country",
            subcaption: "For all users in 2017",
            showpercentvalues: "1",
            defaultcenterlabel: "NBA",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            decimals: "1",
            theme: "candy",
            captionFont: "Verdana",
            captionFontSize: "16",
            subCaptionFont: "Verdana",
            subCaptionFontSize: "14",
            doughnutRadius: '45%',
            pieRadius: '45%',
            showPercentValues: "1",
            useDataPlotColorForLabels: "1",
            labelFont: "Verdana",
            labelFontSize: "14",
            bgColor: "#ffffff"
        },
        plot: {
            valueFont: "Verdana",
            valueFontSize: "18",
            valueFontColor: "#333333"
        },
        data
    };

    return (
        <ReactFusioncharts
            className='svg-clip'
            type="pie2d"
            width="600"
            height="500"
            dataFormat="json"
            dataSource={dataSource}
        />
    );
};

export default MyPieChart;