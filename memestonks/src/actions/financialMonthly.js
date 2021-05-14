
export const getFinancialItemMonthly = (symbol) => async dispatch => {

    const API_KEY = '9SEJV46K465GDV17';
    let finItemSymbol = symbol;

    let financialChartXValuesFunction = [];
    let financialChartCloseValuesFunction = [];
    let financialChartOpenValuesFunction = [];
    let financialChartHighValuesFunction = [];
    let financialChartLowValuesFunction = [];

    try{
         await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${finItemSymbol}&outputsize=compact&apikey=${API_KEY}`)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    for (let key in data['Monthly Adjusted Time Series']) {
                        financialChartXValuesFunction.push(key);
                        financialChartCloseValuesFunction.push(data['Monthly Adjusted Time Series'][key]['4. close']);
                        financialChartOpenValuesFunction.push(data['Monthly Adjusted Time Series'][key]['1. open']);
                        financialChartHighValuesFunction.push(data['Monthly Adjusted Time Series'][key]['2. high']);
                        financialChartLowValuesFunction.push(data['Monthly Adjusted Time Series'][key]['3. low']);
                    }
                })
        const financialItem = {
            symbol: finItemSymbol,
            financialChartXValues: financialChartXValuesFunction,
            financialChartCloseValues: financialChartCloseValuesFunction,
            financialChartOpenValues: financialChartOpenValuesFunction,
            financialChartHighValues: financialChartHighValuesFunction,
            financialChartLowValues: financialChartLowValuesFunction,
        };
        dispatch({
            type: "GET_FINANCIAL_ITEM_MONTHLY",
            payload: financialItem
        })
    }catch (e) {
        console.log(e)
    }
}

export const get_search_term = (ticker) => ({
    type:'GET_SEARCH_TERM',
    payload: {
        ticker:ticker
    }
})