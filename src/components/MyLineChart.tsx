import React, { useState, useEffect } from 'react';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFusioncharts from 'react-fusioncharts';

// Add FusionCharts and TimeSeries as dependencies to FusionCharts
ReactFusioncharts.fcRoot(FusionCharts, TimeSeries);

const MyLineChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const schema = [
    {
      "name": "Team",
      "type": "string"
    },
    {
      "name": "Time",
      "type": "date",
      "format": "%Y-%m-%dT%H:%M:%S.%LZ"
    },
    {
      "name": "Average Value",
      "type": "number"
    }
  ];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData("http://144.172.74.54:5000/time/test")
      .then((dataRes) => {
        const transformedData = dataRes.results
          .map((item: any) => ([
            item.team_name,
            item.date_time,
            item.average_value
          ]));

        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

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


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const dataSource = {
    chart: {
      anchorRadius: 0,
      lineSmoothing: 1,
      lineThickness: 2
    },
    caption: { text: "Bet Handle Analysis" },
    subcaption: { text: "Grocery" },
    xAxis: {
      plot: "Time"
    },

    yaxis: [
      {
        plot: [
          {
            value: "Average Value",
            plottype: "line",
            connectnulldata: true,
            style: {
              "plot.null": {
                "stroke-dasharray": "none"
              }
            }
          }
        ],
        title: "Sale Value"
      }
    ],
    navigator: {
      enabled: 0
    },
    series: "Team",
    data: new FusionCharts.DataStore().createDataTable(data, schema),
  };

  return (
    <ReactFusioncharts
      type="timeseries"
      width="100%"
      height="500"
      dataFormat="json"
      dataSource={dataSource}
    />
  );
};

export { MyLineChart };
