import React, {useState, useEffect} from 'react';
import Chart from "react-apexcharts";
import '../Components/DataChart.css'

function DataChart({timeSeries, simbol}) {
  
  const rawSeries = timeSeries;
  const timestampsSeries = Object.keys(rawSeries).reverse().map(timestamp => { 
    let time = parseInt((new Date(timestamp).getTime()))
    return time
  });
  const open = Object.keys(rawSeries).reverse().map(timestamp => {
    return rawSeries[timestamp]['1. open']
  });
  const highest = Object.keys(rawSeries).reverse().map(timestamp => {
    return rawSeries[timestamp]['2. high']
  });
  const lowest = Object.keys(rawSeries).reverse().map(timestamp => {
    return rawSeries[timestamp]['3. low']
  });
  const close = Object.keys(rawSeries).reverse().map(timestamp => {
    return rawSeries[timestamp]['4. close']
  });
  
  const graphXaxis = () => {
    let arr = [];
    for(let i=0; i<=99; i++){
      arr.push([timestampsSeries[i],open[i],highest[i],lowest[i],close[i]])
    }
    

    setAxis(prevState => {
      return {
        options: {...prevState.options},
        series: [
          {
            name: 'guxhi',
            data: arr
          }
        ]
      }
    })
  }

  useEffect(() => {
    graphXaxis();
    //eslint-disable-next-line
  }, [timeSeries])

 

  const [axis, setAxis] = useState({
    options: {
      xaxis: {
        type: 'datetime',
        categories: [],
        labels: {
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM'
            },
        }
      }   
    },
    series: [
      {
        name: "series-1",
        data: []
      }
    ]
  })


  return (
    <div className="chart">
      {simbol &&  <Chart 
           type="candlestick"
           options={axis.options}
           series={axis.series}
           height={300}
        />}
        
      
    </div>
  )
}

export default DataChart
