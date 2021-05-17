import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import LineChart from "./plots/LineChart";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCryptoItem, get_search_term } from "../actions/cryptoDaily";
import CryptoSearch from "./CryptoSearch";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CryptoHealth from "./CryptoHealth";
import CryptoExchange from "./CryptoExchange";

const FinancialItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto daily useEffect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoItem(searchTerm.ticker));
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
  const financialItem = useSelector((state) => state.cryptoDaily.financialItem);
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
      <div>
        <CryptoExchange searchValue={searchTerm} />
      </div>
      <div>
        <CryptoHealth searchValue={searchTerm} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  financialItem: state.financialItem,
});

export default connect(mapStateToProps, { getCryptoItem })(FinancialItem);
