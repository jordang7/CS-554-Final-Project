import React from 'react';
import FinancialItem from "./components/FinancialItem";
import Home from "./components/Home";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import { AuthProvider } from './firebase/Auth';
import PrivateRoute from './components/PrivateRoute';
import About from './components/aboutus'
import Brokerage from './components/Brokerage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store";

const defaultPath = () =>{
  <h1>Page not found</h1>
}

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <div className="App">

            <header className="App-header">
              <Link className="home-link" to="/">
                Home
              </Link>
              <Link className="stock-chart-link" to="/stock-chart">
                Stock Charts
              </Link>
              <Link className="brokerage-link" to="/brokerage">
                Brokerage Apps
              </Link>
              <Link className="about-link" to="/about">
                About Us
              </Link>
            </header>
            <div className="App-body">
              <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/stock-chart" component={FinancialItem}/>
                <PrivateRoute exact path="/account" component={Account}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/brokerage" component={Brokerage}/>
                <Route component={defaultPath}/>
              </Switch>
            </div>


          </div>
        </Router>

      </Provider>
    </AuthProvider>
  );
}

export default App;