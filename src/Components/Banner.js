import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {FaSearch} from 'react-icons/fa';
import "../Components/Banner.css"


function Banner({metaData, timeSeries, setTimeSeries, setMetaData, o, c, simbol, date, setC, setL, setH, setO, setSimbol, setDate, stockList, setStockList}) {

  const inputRef = useRef(null)
  const [percentage, setPercentage] = useState('-.--%')


  const addToWatchlist = (e) => {
    e.preventDefault();
    
    const newStock = {
      id: new Date().getTime(),
      text: simbol.toUpperCase(),
      closing: c,
    }
    setStockList([newStock, ...stockList]);
  }
  
  

  const fetchData = (e) => {
    e?.preventDefault()

    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: inputRef.current.value || 'tsla',
        outputsize: 'compact',
        datatype: 'json'
      },
      headers: {
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': '59e7bd3068msh80b87035f48ec39p178ff4jsn5e318dbe560a'
      }
    };

    axios.request(options).then(function (response) {
      setMetaData(response.data['Meta Data'])
      setTimeSeries(response.data['Time Series (Daily)'])
    }).catch(function (error) {
      alert(error);
    });
  }

  const rawSeries = timeSeries;
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
      
      const rawData = metaData;
      const arrMetaData = Object.keys(rawData).map(item => {
        return rawData[item]
      });

  

  const perxx=(a,b)=>{
    let p=((parseFloat(a)-parseFloat(b))/parseFloat(a))*100
    return p.toFixed(2)
  }
  const handlePercentageChange=(e)=>{
    e?.preventDefault()
    let p=perxx(c,o)
    //console.log(p)
    setPercentage(p)
  }

  const handleDataAssingment = (e) => {
    e?.preventDefault()
    
    setO(open[99]);
    setC(close[99]);
    setH(highest[99]);
    setL(lowest[99]);
    setSimbol(arrMetaData[1])
    setDate(arrMetaData[2])
  }

  useEffect(() => {
    handlePercentageChange()
  }, [o,c])
  
  useEffect(() => {
    handleDataAssingment();
    //eslint-disable-next-line
  }, [metaData, timeSeries]); 


  return (
    <div>
      <h1 className="title">WARNING: DO NOT USE THIS APP FOR REAL TIME TRADING!</h1>
      <form type='submit' className="form_field">
        
        <input 
          className="input"
          ref={inputRef} 
          type="text" 
          placeholder='Symbol' 
        />
        <button className="btn_search" onClick={fetchData} ><FaSearch/></button>
        <button className="btn_add" onClick={(e) => {addToWatchlist(e)}}>add to watchlist</button>

      </form>
      {simbol && o ? (<div className="info_section">
        <h2>{`Latest Update: ${date}`}</h2>
        <h2>{`Symbol: ${simbol}`}</h2>
        <h3>{`Close: ${c}$`}</h3>
        <h3>{`Open: ${o}$`}</h3>
        {percentage > 0 ? (<h3 className="green">{`Change in percentage: ${percentage}%`}</h3>):(<h3 className="red">{`Change in percentage: ${percentage}%`}</h3>)}
        
        
        
      </div>) : (<></>) }
      
      
      
    </div>
  )
}

export default Banner
