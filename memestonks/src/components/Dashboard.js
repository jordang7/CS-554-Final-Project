import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
// import { withStyles } from "@material-ui/core/styles";
// import SignOutButton from "./SignOut";
// import "../App.css";
// import "../css/account.css";
// import ChangePassword from "./ChangePassword";
// import AddProfilePicture from "./addProfilePicture";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  // StyledTableRow,
  withStyles,
  Container,
  Button,
} from "@material-ui/core";
const axios = require("axios");

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Dashboard() {
  // const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTerm, setDeleteTerm] = useState("");
  const [searchData, setSearchData] = useState(false);

  const [mainData, setMainData] = useState(undefined);

  const [companyName1, setCompanyName1] = useState(undefined);
  const [companySymbol, setCompanySymbol] = useState(undefined);
  const [companyPrice, setCompanyPrice] = useState(undefined);
  // var companyname = "";
  // let companySymbol = [];
  var price = [];

  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      try {
        axios("http://localhost:8080/checkStock/" + currentUser.email + "/")
          .then((result) => {
            console.log("check button", result);
            setMainData(result.data);
            setSearchData(true);
            // if (result.data == null) {
            //   setCacheButton(false);
            // } else {
            //   setCacheButton(true);
            // }
          })
          .catch((error) => {
            console.error("error happened:" + error);
          });
      } catch (e) {
        console.log(e);
      }
    }
    // if (props.searchValue != null) {
    // console.log("searchTerm is set");
    fetchData();
    // }
  }, []);

  useEffect(() => {
    console.log("delete useEffect fired");
    async function fetchData() {
      try {
        axios(
          "http://localhost:8080/deleteStockFromprofile/" +
            currentUser.email +
            "/" +
            deleteTerm
        )
          .then((result) => {
            console.log(result);

            console.log(result.newCompanyValue);
            // setCompanyName1("result.data.companyName");
            // setCompanySymbol("result.data.companySymbol");
            // setCompanyPrice("result.data.companyPrice");
            setMainData(result.data.newCompanyValue);
            setSearchData(true);
          })
          .catch((error) => {
            console.error("error happened:" + error);
            // dispatch(actions.changeError(true));
          });
      } catch (e) {
        console.log(e);
      }
    }
    if (deleteTerm) {
      console.log("deleteTerm is set");
      fetchData();
    }
  }, [deleteTerm]);

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const deleteValue = async (value) => {
    // console.log(value);
    setDeleteTerm(value);
    // fetchData(value);
    // dispatch(actions.changeSearchTerm(value));
  };

  console.log("mainData", mainData);

  let profileStockData = [];
  let mainParsedData = mainData;
  console.log("mainParsedData", mainParsedData);
  // let z = ["as", "zxc", "qew"];
  // for (let i of z) {
  // let parseImages = JSON.parse(i);
  // console.log(i);
  // profileStockData.push(i);
  // }
  for (let i in mainParsedData) {
    console.log(mainParsedData[i]);
    profileStockData.push(JSON.parse(mainParsedData[i]));
  }

  // for (let i of profileStockData) {
  //   console.log(i);
  //   // profileStockData.push(JSON.parse(mainParsedData[i]));
  // }
  // mainParsedData.forEach((x) => {
  //   let parseImages = JSON.parse(x);
  //   // console.log(oldBinnedImage);
  //   profileStockData.push(parseImages);
  // });

  let card = null;

  // console.log("profileStockData", profileStockData);

  const buildCard = (character) => {
    return (
      <div>
        {searchData ? (
          // <Container>
          //   <TableContainer component={Paper}>
          //     <Table className={"classes.table"} aria-label="customized table">
          //       <TableHead>
          //         <TableRow>
          //           <StyledTableCell>Name</StyledTableCell>
          //           <StyledTableCell align="right">Symbol</StyledTableCell>
          //           <StyledTableCell align="right">Price</StyledTableCell>
          //           <StyledTableCell align="right">Option</StyledTableCell>
          //         </TableRow>
          //       </TableHead>
          <TableBody>
            {/* {companyname} */}
            <StyledTableRow key={"row.name"}>
              <StyledTableCell component="th" scope="row">
                {character.companyName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {character.companySymbol}
              </StyledTableCell>
              <StyledTableCell align="right">
                {character.companyPrice}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  // type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteValue(character.companySymbol)}
                >
                  Remove
                </Button>
              </StyledTableCell>
            </StyledTableRow>
            {/* ))} */}
          </TableBody>
        ) : null}
        {/* <AddProfilePicture />
      <ChangePassword />
      <SignOutButton /> */}
      </div>
    );
  };

  if (true) {
    card =
      profileStockData &&
      profileStockData.map((character) => {
        // let { show } = shows;
        return buildCard(character);
      });
  }

  return (
    <div>
      <div className="heading-name">
        <h2>Dashboard</h2>
      </div>
      <div>
        <p>
          Currently, You don't have any stock to see. Go to stock page add it to
          the list.
        </p>
      </div>
      <Container>
        <TableContainer component={Paper}>
          <Table className={"classes.table"} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Symbol</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Option</StyledTableCell>
              </TableRow>
            </TableHead>
            {card}
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Dashboard;
