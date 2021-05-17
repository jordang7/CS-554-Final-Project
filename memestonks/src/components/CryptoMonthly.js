import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCryptoMonthly, get_search_term } from "../actions/cryptoMonthly";
import CryptoSearch from "./CryptoSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Monthly useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoMonthly(searchTerm.ticker));
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
    (state) => state.cryptoMonthly.financialItem
  );
  console.log("Crypto Monthhly SELECTOR", financialItem);
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

export default connect(mapStateToProps, { getCryptoMonthly })(FinancialItem);
