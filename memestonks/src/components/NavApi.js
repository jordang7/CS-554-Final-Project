import React from "react";
import "../App.css";

import { Link } from "react-router-dom";
function Root() {
  return (
    <div class="row" className="flatnav">
      <br></br>
      <Link className="daily item" to="/stock-chart">
        Daily
      </Link>

      <Link className="weekly item" to="/stock-chart-weekly">
        Weekly
      </Link>

      <Link className="monthly item" to="/stock-chart-Monthly">
        Monthly
      </Link>

      {/* <Link className="flatnav-item" to="/stock-chart-info">
          Info
        </Link> */}
    </div>
  );
}

export default Root;
