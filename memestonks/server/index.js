const express = require("express");
const app = express();
const md5 = require("blueimp-md5");
const axios = require("axios");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const PORT = 8080;
const fetch = require("node-fetch");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var cors = require("cors");

app.use(cors());

app.get("/financial/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemData${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Time Series (Daily)"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Time Series (Daily)"][key]["4. close"]
              );
              financialChartOpenValuesFunction.push(
                data["Time Series (Daily)"][key]["1. open"]
              );
              financialChartHighValuesFunction.push(
                data["Time Series (Daily)"][key]["2. high"]
              );
              financialChartLowValuesFunction.push(
                data["Time Series (Daily)"][key]["3. low"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `finItemData${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/financial/overview/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("financial overview fired");
    let overview = await client.getAsync(`finOverview${ticker}`);
    if (overview == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let overviewData = null;
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            overviewData = data;
          });
      } catch (e) {
        return e;
      }

      await client.setAsync(
        `finOverview${ticker}`,
        JSON.stringify(overviewData)
      );
      res.json(overviewData);
    } else {
      console.log("Overview already cached");
      res.json(JSON.parse(overview));
    }
  } catch (e) {
    console.log("Error in Overview express route");
    res.json(e);
  }
});

app.get("/financialWeekly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemDataWeekly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Weekly Adjusted Time Series"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Weekly Adjusted Time Series"][key]["4. close"]
              );
              financialChartOpenValuesFunction.push(
                data["Weekly Adjusted Time Series"][key]["1. open"]
              );
              financialChartHighValuesFunction.push(
                data["Weekly Adjusted Time Series"][key]["2. high"]
              );
              financialChartLowValuesFunction.push(
                data["Weekly Adjusted Time Series"][key]["3. low"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `finItemDataWeekly${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/financialMonthly/:ticker", async function (req, res) {
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`finItemDataMonthly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${ticker}&outputsize=compact&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Monthly Adjusted Time Series"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Monthly Adjusted Time Series"][key]["4. close"]
              );
              financialChartOpenValuesFunction.push(
                data["Monthly Adjusted Time Series"][key]["1. open"]
              );
              financialChartHighValuesFunction.push(
                data["Monthly Adjusted Time Series"][key]["2. high"]
              );
              financialChartLowValuesFunction.push(
                data["Monthly Adjusted Time Series"][key]["3. low"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `finItemDataMonthly${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
});

app.get("/cryptoExchangeRates/:ticker", async function(req,res){
  try{
    const ticker = req.params.ticker
    const API_KEY = "9SEJV46K465GDV17";
    let data = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${ticker}&to_currency=USD&apikey=${API_KEY}`)
    res.json(data.data)
  }catch(e){
    console.log(e)
    res.json(e)
  }
});


app.get("/cryptoHealthIndex/:ticker",async function(req,res){
  try{
    const ticker = req.params.ticker
    const API_KEY = "9SEJV46K465GDV17";
    let data = await axios.get(`https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${ticker}&apikey=${API_KEY}`)
    res.json(data.data)
  }catch(e){
    console.log(e)
    res.json(e)
  }
})

app.get("/cryptoDaily/:ticker",async function(req,res){
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoDaily${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Time Series (Digital Currency Daily)"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Time Series (Digital Currency Daily)"][key]["4b. close (USD)"]
              );
              financialChartOpenValuesFunction.push(
                data["Time Series (Digital Currency Daily)"][key]["1b. open (USD)"]
              );
              financialChartHighValuesFunction.push(
                data["Time Series (Digital Currency Daily)"][key]["2b. high (USD)"]
              );
              financialChartLowValuesFunction.push(
                data["Time Series (Digital Currency Daily)"][key]["3b. low (USD)"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `cryptoDaily${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
})

app.get("/cryptoWeekly/:ticker",async function(req,res){
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoWeekly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Time Series (Digital Currency Weekly)"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Time Series (Digital Currency Weekly)"][key]["4b. close (USD)"]
              );
              financialChartOpenValuesFunction.push(
                data["Time Series (Digital Currency Weekly)"][key]["1b. open (USD)"]
              );
              financialChartHighValuesFunction.push(
                data["Time Series (Digital Currency Weekly)"][key]["2b. high (USD)"]
              );
              financialChartLowValuesFunction.push(
                data["Time Series (Digital Currency Weekly)"][key]["3b. low (USD)"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `cryptoWeekly${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
})

app.get("/cryptoMonthly/:ticker",async function(req,res){
  try {
    let ticker = req.params.ticker;
    console.log("finItemData fired");
    let finItemData = await client.getAsync(`cryptoMonthly${ticker}`);
    if (finItemData == null) {
      const API_KEY = "9SEJV46K465GDV17";
      let financialChartXValuesFunction = [];
      let financialChartCloseValuesFunction = [];
      let financialChartOpenValuesFunction = [];
      let financialChartHighValuesFunction = [];
      let financialChartLowValuesFunction = [];
      try {
        await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            for (let key in data["Time Series (Digital Currency Monthly)"]) {
              financialChartXValuesFunction.push(key);
              financialChartCloseValuesFunction.push(
                data["Time Series (Digital Currency Monthly)"][key]["4b. close (USD)"]
              );
              financialChartOpenValuesFunction.push(
                data["Time Series (Digital Currency Monthly)"][key]["1b. open (USD)"]
              );
              financialChartHighValuesFunction.push(
                data["Time Series (Digital Currency Monthly)"][key]["2b. high (USD)"]
              );
              financialChartLowValuesFunction.push(
                data["Time Series (Digital Currency Monthly)"][key]["3b. low (USD)"]
              );
            }
          });
      } catch (e) {
        return e;
      }
      const financialItem = {
        symbol: ticker,
        financialChartXValues: financialChartXValuesFunction,
        financialChartCloseValues: financialChartCloseValuesFunction,
        financialChartOpenValues: financialChartOpenValuesFunction,
        financialChartHighValues: financialChartHighValuesFunction,
        financialChartLowValues: financialChartLowValuesFunction,
      };
      await client.setAsync(
        `cryptoMonthly${ticker}`,
        JSON.stringify(financialItem)
      );
      res.json(financialItem);
    } else {
      console.log("already cached");
      res.json(JSON.parse(finItemData));
    }
  } catch (e) {
    console.log("error");
    res.json(e);
  }
})

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
