import React from "react";
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
        </div>
    );
}

export default Root;