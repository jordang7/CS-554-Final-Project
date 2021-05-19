import React from "react";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles({
  add_remove_stock_chart: {
    backgroundColor: "rgb(248, 113, 113)",
  },
});

const SignOutButton = () => {
  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.add_remove_stock_chart}
        type="button"
        variant="contained"
        onClick={doSignOut}
      >
        Sign Out
      </Button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default SignOutButton;
