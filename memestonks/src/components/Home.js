import React from "react";
import SignOut from './SignOut';
import {
    Link
  } from "react-router-dom";
function Root() {
    return (
        <div>
            <h1>MEMESTONKS</h1>
            <div>
                <Link to="/stock-chart">Click here for real time stock prices</Link>
            </div>
            <div>
                <Link to="/signin">Click here to Sign in!</Link>
            </div>
            <div>
                <Link to="/signup">Click here to Sign Up!</Link>
            </div>
<SignOut/>
        </div>
    );
}

export default Root;