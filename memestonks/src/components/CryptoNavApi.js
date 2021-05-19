import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
function Root() {
  return (
    <div class="row" className="flatnav">
      <br></br>
      <Link className="daily item" to="/crypto-chart">
        Daily
      </Link>

      <Link className="weekly item" to="/crypto-chart-weekly">
        Weekly
      </Link>

      <Link className="monthly item" to="/crypto-chart-Monthly">
        Monthly
      </Link>

      {/* <Link className="flatnav-item" to="/stock-chart-info">
          Info
        </Link> */}
    </div>
  );
}

export default Root;
