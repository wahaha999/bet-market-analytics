import React, { useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import Loading from './Loading';
import { API_URL } from '../constant';

interface BubbleDataType {
    "x": string;
    "y": string;
    "z": string;
    "name": string;
}

interface  CategorDataType {
    "label": string,
    "x": string
}

interface DataItemType {
    client_name: string;
    player_name: string;
    client_player_sum: number;
    percent: number;
}

interface ResponseDataType {
    results: DataItemType[]
}

charts(FusionCharts);

const MyBubbleChart: React.FC = () => {
    const [data, setData] = useState<BubbleDataType[]>([]);
    const [category, setCategory] = useState<CategorDataType[]>([]);
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
    type StringToNumberMap = { [key: string]: number };

    const createMapping = (items: string[]) => {
        const uniqueItems = Array.from(new Set(items));
        return uniqueItems.reduce((acc:StringToNumberMap, item:string, index:number) => {
            acc[item] = index + 1; // Starting index from 1
            return acc;
        }, {});
    };
    useEffect(() => {
        loadData(`${API_URL}/dimension/clientplayer`)
            .then((dataRes: ResponseDataType) => {
            const clientMapping = createMapping(dataRes.results.map(item => item.client_name));
            const playerMapping = createMapping(dataRes.results.map(item => item.player_name));
            const transformedData = dataRes.results.map((item) => ({
                "x": `${playerMapping[item.player_name]*700}`,
                "y": `${clientMapping[item.client_name]*1000}`,
                "z": `${(Math.max(item.percent, 0.01)*3).toFixed(2) }`, // Bubble size
                "name": `${item.client_name}`,// For tooltip
            }));

            const labelData = [...new Set(dataRes.results.map(item=> item.player_name))]
            const categoryData = labelData.map((item) => ({
                "label": item,
                "x": `${playerMapping[item]*700}`
            }))
                setCategory(categoryData)
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
        "chart": {
            "caption": "Client-Player Bet Trend",
            "xAxisMinValue": "0",
            "xAxisMaxValue": "12000",
            "yAxisMinValue": "0",
            "yAxisMaxValue": "12000",
            'zRadiusMinValue': "5",
            'zRadiusMaxValue': "30",
            "plotFillAlpha": "80",
            "plotFillHoverColor": "#6495ED",
            "plotTooltext": "$name: $zvalue%",
            "xAxisName": "Player",
            "yAxisName": "Client",
            "drawQuadrant": "1",
            "quadrantLineAlpha": "80",
            "quadrantLineThickness": "1",
            "use3dlighting": "0",
            "showAlternateHGridColor": "0",
            "showAlternateVGridColor": "0",
            "theme": "fusion",
            "captionFont": "Verdana",
            "captionFontSize": "18",
        },
        "categories": [
            {
                "category": category
            }
        ],
        "dataset": [
            {
                "data": data
            }
        ]
    };

    return (
            <ReactFusioncharts
                className='svg-bubble'
                type="bubble"
                width="1300"
                height="1000"
                dataFormat="json"
                dataSource={dataSource}
            />
    );
};

export default MyBubbleChart;