import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFinancialItem, get_search_term } from "../actions/financial";
import StockSearch from "./StockSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Overview from "./Overview";
import NavApi from "./NavApi";
import "../App.css";
const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("search useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getFinancialItem(searchTerm.ticker));
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
    (state) => state.financialItem.financialItem
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
  }
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
              duration={"Daily chart"}
            />
          ) : null}
        </div>
        <div>
          {
            searchTerm ? 
            <Overview searchValue={searchTerm} /> : null}
        </div>
      </div>
    );
  }

// FinancialItem.propTypes = {
//     financialItem: PropTypes.object.isRequired,
//     getFinancialItem: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getFinancialItem })(FinancialItem);
