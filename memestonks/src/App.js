
import React from 'react';
import FinancialItem from "./components/FinancialItem";
import Home from "./components/Home";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Account from './components/Account';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';

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
    <AuthProvider>
      <Provider store={store}>
          <div className="App">
          <Router>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <PrivateRoute exact path="/stock-chart">
                    <FinancialItem/>
                </PrivateRoute>
                <PrivateRoute exact path="/account">
                  <Account/>
                </PrivateRoute>
                <Route exact path="/signin">
                    <SignIn/>
                </Route>
                <Route exact path="/signup">
                    <SignUp/>
                </Route>
            </Switch>
            </Router>
          </div>
      </Provider>
      </AuthProvider>
  );
}

export default App;