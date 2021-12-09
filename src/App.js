import React, { useState } from 'react';
import './App.css';
import Banner from './Components/Banner';
import DataChart from './Components/DataChart';
import StockPotfolioList from './Components/StockPotfolioList';



function App() {
  
  const [metaData, setMetaData] = useState({});
  const [timeSeries, setTimeSeries] = useState({});
  const [stockList, setStockList] = useState([]);
  const [o, setO] = useState('-.--')
  const [c, setC] = useState('-.--')
  const [l, setL] = useState('-.--')
  const [h, setH] = useState('-.--')
  const [simbol, setSimbol] = useState('')
  const [date, setDate] = useState('--/--/----')
 

  return (
    <div className="App">

      <Banner
        metaData={metaData}
        setMetaData={setMetaData}
        timeSeries={timeSeries}
        setTimeSeries={setTimeSeries}
        stockList={stockList}
        setStockList={setStockList}
        o={o}
        setO={setO}
        c={c}
        setC={setC}
        setH={setH}
        setL={setL}
        simbol={simbol}
        setSimbol={setSimbol}
        date={date}
        setDate={setDate}
      />
      
      <DataChart
        timeSeries={timeSeries}
        simbol={simbol}
      />

      <StockPotfolioList 
        stockList={stockList}
        setStockList={setStockList}
      />



    </div>
  );
}

export default App;
