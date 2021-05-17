import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  get_search_term,
  getCryptoExchange,
} from "../actions/cryptoExchangeRate";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";

const CryptoExchange = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("overview Use effect fired");
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

  const cryptoExchange = useSelector((state) => state.cryptoExchange);
  console.log("Overview SELECTOR", cryptoExchange);
  if (cryptoExchange != null) {
    return <div>crypto Rate</div>;
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
