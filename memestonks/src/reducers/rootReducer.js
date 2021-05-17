import { combineReducers } from "redux";
import financialItem from "./financialItemReducer";
import financialItemWeekly from "./financialItemWeeklyReducer";
import financialItemMonthly from "./financialItemMonthlyReducer";
import financialOverview from "./financialOverviewReducer";
import cryptoExchange from "./cryptoExchangeReducer";
import cryptoHealth from "./cryptoHealthReducer";
export default combineReducers({
  financialItem,
  financialItemWeekly,
  financialItemMonthly,
  financialOverview,
  cryptoExchange,
  cryptoHealth,
});
