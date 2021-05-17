import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCryptoWeekly, get_search_term } from "../actions/cryptoWeekly";
import CryptoSearch from "./CryptoSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Weekly useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoWeekly(searchTerm.ticker));
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
    (state) => state.cryptoWeekly.financialItem
  );
  console.log("SELECTOR", financialItem);
  return (
    <div className="financial-item-big-wrapper">
      <div>
        <CryptoSearch searchValue={searchValue} />
        {financialItem ? (
          <LineChart
            color="red"
            financialItem={financialItem}
            financialItemName={financialItem.symbol}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getCryptoWeekly })(FinancialItem);
