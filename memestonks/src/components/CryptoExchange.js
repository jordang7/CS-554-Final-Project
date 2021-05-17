import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  get_search_term,
  getCryptoExchange,
} from "../actions/cryptoExchangeRate";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import CryptoSearch from "./CryptoSearch";

const CryptoExchange = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Exchange Use effect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(searchTerm.ticker));
        dispatch(getCryptoExchange(searchTerm.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (searchTerm != null) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [searchTerm]);
  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const cryptoExchange = useSelector(
    (state) => state.cryptoExchange.cryptoExchange
  );
  console.log("Crypto exchange SELECTOR", cryptoExchange);
  if (cryptoExchange != null) {
    let data = cryptoExchange["Realtime Currency Exchange Rate"];
    console.log(data);
    return (
      <div>
        <CryptoSearch searchValue={searchValue} />
        <div>
          <h2>Exchange Rates</h2>
          <p>
            {data["2. From_Currency Name"]}({data["1. From_Currency Code"]}) ={" "}
            {data["3. To_Currency Code"]} {data["5. Exchange Rate"]}
          </p>
          <p>Last Updated on {data["6. Last Refreshed"]} </p>
        </div>
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

export default connect(mapStateToProps, { getCryptoExchange })(CryptoExchange);
