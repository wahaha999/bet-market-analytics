import { useState, useEffect } from 'react';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFusioncharts from 'react-fusioncharts';
import Loading from './Loading';
import { API_URL } from '../constant';

ReactFusioncharts.fcRoot(FusionCharts, TimeSeries);

interface Props {
  marketType: string,
  startTime: string,
  endTime: string,
}

export default function MyLineBetChart  (props: Props) {
  const [data, setData] = useState<any[]>([]);
  const { marketType, startTime, endTime } = props

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
    setLoading(true)
    loadData(`${API_URL}/time/bet?type=${marketType}&start_date=${startTime}&end_date=${endTime}`)
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
        setError(error.toString());
        setLoading(false);
      });
  }, [marketType, startTime, endTime]);

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


  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const dataSource = {
    chart: {
      anchorRadius: 0,
      lineSmoothing: 1,
      lineThickness: 2
    },
    caption: { text: "MIN vs UTA Team Bet Handle Analysis" },
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
        title: "Average Bet Trend"
      }
    ],
    navigator: {
      enabled: 1
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

