import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import search_term from './search_term';
import '../App.css';

const Search_page = (props) => {
    const key = "AWWY4QSC0AS018VB"
    let API_Call_first = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
    let API_CALL_second = `&interval=1day&apikey=${key}`
    


    let [stock_output, setstock_output] = useState(undefined)
    let [stock_symbol, setsymbol] = useState('')
    let [loading, setloading] = useState(true)

    let track = ''
  
  
    useEffect(() => {
      async function fetchData(){
        try{
          let data = await axios.get(API_Call_first + stock_symbol + API_CALL_second)
            // console.log("inside fetch data")
            console.log(data)
            // console.log("finish fetch data")
            setstock_output(data)
            setloading(false)
          
        } catch (e){
          console.log('Error for get stock info')
          console.log(e)
        }
      }
  
      if(stock_symbol){
        console.log("data is set")
        fetchData()
      }
    }, [stock_symbol])
  
    const searchValue = async (raw) => {
        console.log(raw.target.value)
      track = raw.target.value
    }

    const set_value = async () => {
        setsymbol(track);
        track = stock_symbol
      }
  
        /**
     * "1. open": "122.8500"
​
        "2. high": "124.6400"
        ​
        "3. low": "122.4100"
        ​
        "4. close": "124.6200"
        ​
        "5. volume": "3690737"
     * 
     */

    const eachday = (date, info) => {
        return (
            <dev class = "sub_info">
                <p>date: {date}</p>
                <p>High: {info["2. high"]}</p>
                <p>Low: {info["3. low"]}</p>
                <p>Open: {info["1. open"]}</p>
                <p>Close: {info["4. close"]}</p>
                <br />
            </dev>
        )
    }
  
    let stock_desplay;
    if(stock_symbol && stock_output !== undefined){
      let useful_data = stock_output.data;
      
      if(useful_data["Error Message"] !== undefined){
          stock_desplay = <p>This stock does not exist</p>
      } else{
        // console.log("Debug to see if stock exist")
        // console.log(useful_data["Time Series (Daily)"])
        let stock_info = useful_data["Time Series (Daily)"]
        stock_desplay = 
        stock_info && 
        Object.keys(stock_info).map(function(key){
            // console.log(stock_info[key])
            return eachday(key, stock_info[key])
        })
      }

      

    }
    
  
    // if(loading){
    //   return (
    //     <div>
    //       <h2>Loading</h2>
    //     </div>
    //   )
    // }
    // else {
  
  
  
    
      
  
      return (
        <div className="App">
          <form method='POST ' onSubmit={(e) => { e.preventDefault(); }} name='formName'>
              <label>
                  <span>Search Shows: </span>
                  <input autoComplete='off' type='text' name='searchTerm' onChange={searchValue}/>
              </label>
              <button type = "submit"  onClick={set_value}>Submit</button>
          </form>
  
        {stock_desplay}
  
            
        </div>
      );
    //}
  
}


export default Search_page;