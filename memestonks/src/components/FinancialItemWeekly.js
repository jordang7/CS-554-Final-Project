import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getFinancialItemWeekly,
  get_search_term,
} from "../actions/financialWeekly";
import StockSearch from "./StockSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Overview from "./Overview";
import "../App.css";
import NavApi from "./NavApi";
const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getFinancialItemWeekly(searchTerm.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);
  const searchValue = async (value) => {
    setSearchTerm(value);
  };
  const financialItem = useSelector(
    (state) => state.financialItemWeekly.financialItem
  );
  console.log("SELECTOR", financialItem);
  if (
    financialItem &&
    financialItem.errorMessage &&
    financialItem.errorMessage === "error"
  ) {
    return (
      <div className="financial-item-big-wrapper">
        <div>
          <StockSearch searchValue={searchValue} />
          <p className="error-message">
            {" "}
            Data for this company does not exist or API calls exceeded. Please
            Try again after sometime!{" "}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="financial-item-big-wrapper">
        <NavApi />

        <div>
          <StockSearch searchValue={searchValue} />
          <br />
          {financialItem ? (
            <LineChart
              color="blue"
              financialItem={financialItem}
              financialItemName={financialItem.symbol}
            />
          ) : null}
        </div>
        <div>
          <Overview searchValue={searchTerm} />
        </div>
      </div>
    );
  }
};

// FinancialItem.propTypes = {
//     financialItem: PropTypes.object.isRequired,
//     getFinancialItem: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getFinancialItemWeekly })(
  FinancialItem
);
