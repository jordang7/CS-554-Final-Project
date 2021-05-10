
import React from 'react';
import FinancialItem from "./components/FinancialItem";
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import {Provider} from 'react-redux'
import store from "./store";

function App(){
  return (
      <Provider store={store}>
          <div className="App">
          <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/stock-chart">
                    <FinancialItem/>
                </Route>
            </Switch>
            </Router>
          </div>
      </Provider>
  );
}

export default App;