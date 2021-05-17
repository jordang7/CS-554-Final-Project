import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get_search_term } from "../actions/financial";
import { getFinOverview } from "../actions/overview";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

const FinancialOverview = (props) => {
  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const dispatch = useDispatch();
  console.log("overview component", props.searchValue);
  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      try {
        //dispatch(get_search_term(searchTerm.ticker));
        dispatch(getFinOverview(props.searchValue.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (props.searchValue != null) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [props.searchValue]);

  const finOverview = useSelector(
    (state) => state.financialOverview.finOverview
  );
  console.log("Overview SELECTOR", finOverview);
  if (finOverview != null) {
    return (
      <div className="overview">
        <p>
          EPS : {finOverview["EPS"]}, Target Price :{" "}
          {finOverview.AnalystTargetPrice} , Dividend Yield :{" "}
          {finOverview.DividendYield}, 52 week High :{" "}
          {finOverview["52WeekHigh"]}, 52 week Low : {finOverview["52WeekLow"]}
        </p>
        <ul>
          <li>
            <h2>Asset Type</h2>
            <p>{finOverview.AssetType}</p>
          </li>
          <li>
            <p>
              <h2>About the Company </h2>
              {finOverview.Description}
            </p>
          </li>
          <li>
            <p>
              <h2>Sector </h2>
              {finOverview.Sector}
            </p>
          </li>
          <li>
            <h2>Country </h2>
            <p>{finOverview.Country}</p>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  finOverview: state.finOverview,
});

export default connect(mapStateToProps, { getFinOverview })(FinancialOverview);
