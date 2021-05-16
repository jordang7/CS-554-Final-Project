const express = require('express');
const app = express();
const md5 = require('blueimp-md5');
const axios = require('axios');
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const PORT = 8080;
const fetch = require("node-fetch")


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var cors = require('cors')

app.use(cors())

app.get('/financial/:ticker', async function(req, res) {
  try{
    let ticker = req.params.ticker
    console.log("finItemData fired")
    let finItemData = await client.getAsync(`finItemData${ticker}`)
    if(finItemData==null){
      const API_KEY = '9SEJV46K465GDV17';
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try{

        await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    for (let key in data['Time Series (Daily)']) {
                        financialChartXValuesFunction.push(key);
                        financialChartCloseValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
                        financialChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                        financialChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
                        financialChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
                    }
                })
      }catch(e){
        return e
      }
      const financialItem = {
          symbol: ticker,
          financialChartXValues: financialChartXValuesFunction,
          financialChartCloseValues: financialChartCloseValuesFunction,
          financialChartOpenValues: financialChartOpenValuesFunction,
          financialChartHighValues: financialChartHighValuesFunction,
          financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(`finItemData${ticker}`, JSON.stringify(financialItem))
      res.json(financialItem)
    }else{
      console.log("already cached")
      res.json(JSON.parse(finItemData))
    }
  }catch(e){
    console.log("error")
    res.json(e)
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})