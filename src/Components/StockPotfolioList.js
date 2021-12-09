import React, { useEffect} from 'react';
import '../Components/Watchlist.css'



function StockPotfolioList({stockList, setStockList}) {

  useEffect(() => {
    const temp = localStorage.getItem("stockList")
    const storedStocks = JSON.parse(temp)
    if(storedStocks) {
      setStockList(storedStocks)
    }
  },[setStockList]);

  useEffect(() => {
    const temp = JSON.stringify(stockList)
    localStorage.setItem("stockList",temp)
  }, [stockList]);

  const deleteStock = (id) => {
    const updatedStockList = [...stockList].filter((stock) => stock.id !== id);
    setStockList(updatedStockList)
  }

  return (
    <div className="watch">
      
      <h1 className="title">Watchlist:</h1>
      
      {stockList.map(stock => {
        return (
          <div className="stock" key={stock.id}>
            {stock.text}
            {stock.close}
            <button className="remove" onClick={()=>deleteStock(stock.id)}>remove</button>
          </div>
        )
      })}
    </div>
  )
}

export default StockPotfolioList
