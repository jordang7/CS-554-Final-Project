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
import CryptoHealth from "./CryptoHealth";
const CryptoExchange = (props) => {
  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Crypto Exchange Use effect fired");
    async function fetchData() {
      try {
        dispatch(get_search_term(props.searchValue.ticker));
        dispatch(getCryptoExchange(props.searchValue.ticker));
      } catch (e) {
        console.log(e);
      }
    }
    if (props.searchValue != null) {
      console.log("searchTerm is set");
      fetchData();
    }
  }, [props.searchValue]);

  const cryptoExchange = useSelector(
    (state) => state.cryptoExchange.cryptoExchange
  );
  console.log("Crypto exchange SELECTOR", cryptoExchange);
  if (cryptoExchange != null) {
    let data = cryptoExchange["Realtime Currency Exchange Rate"];
    console.log(data);
    return (
      <div>
        <div>
          {data ? <h2>Exchange Rates</h2> : null}
          <p>
            {data ? data["2. From_Currency Name"] + "(" : null}
            {data ? data["1. From_Currency Code"] + ") = " : null}
            {data ? data["3. To_Currency Code"] : null}{" "}
            {data ? data["5. Exchange Rate"] : null}
          </p>
          {data ? <p>Last Updated on {data["6. Last Refreshed"]} </p> : null}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Choose a Cryptocurrency to learn more about it!</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({
  finOverview: state.finOverview,
});

export default connect(mapStateToProps, { getCryptoExchange })(CryptoExchange);
