import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = (props) => {
    const key = "AWWY4QSC0AS018VB"
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&interval=1day&apikey=${key}`
    let [ loading, setLoading] = useState(true);
    let [ infoData, setInfoData] = useState(undefined);
    
    useEffect(() => {
        async function fetchData(){
            try{
                const raw = await axios.get(API_Call)
                setInfoData(raw)
                setLoading(false)
            } catch (e){
                console.log(e)
            }
        }
        fetchData();
    }, [])

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

    if (loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    else{
        //console.log(infoData)

        let useful_data = infoData.data["Time Series (Daily)"]
        //console.log(useful_data)

        let desplay = 
            useful_data && 
            Object.keys(useful_data).map(function(key){
                console.log(useful_data[key])
                return eachday(key, useful_data[key])
            })

        console.log(desplay)
        return(
            <div>
                <p>Test page</p>
            
                {desplay}
            </div>
            
        )
    }

    
}

export default Home;