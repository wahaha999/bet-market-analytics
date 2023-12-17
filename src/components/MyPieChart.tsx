import React, { useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import '../styles/pieChart.css';

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
        loadData("http://144.172.74.54:5000/dimension/country")
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


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const dataSource = {
        chart: {
            caption: "Android Distribution for our app",
            subcaption: "For all users in 2017",
            showpercentvalues: "1",
            defaultcenterlabel: "Android Distribution",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            decimals: "1",
            plottooltext:
              "<b>$percentValue</b> of our Android users are on <b>$label</b>",
            centerlabel: "# Users: $value",
            theme: "gammel"
        },
        data
    };

    return (
        <ReactFusioncharts
            className='svg-clip'
            type="doughnut2d"
            width="600"
            height="500"
            dataFormat="json"
            dataSource={dataSource}
        />
    );
};

export { MyPieChart };