import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFinancialItem, get_search_term } from "../actions/financial";
import StockSearch from "./StockSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Overview from "./Overview";

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
  return (
    <div className="financial-item-big-wrapper">
      <div>
        <StockSearch searchValue={searchValue} />
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
};

// FinancialItem.propTypes = {
//     financialItem: PropTypes.object.isRequired,
//     getFinancialItem: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getFinancialItem })(FinancialItem);
