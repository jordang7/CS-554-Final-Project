import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  doUpdateUserProfile,
  doUpdateProfile,
} from "../firebase/FirebaseFunctions";
// import SignOutButton from "./SignOut";
// import "../App.css";
// import ChangePassword from "./ChangePassword";
import image_not_available from "../css/image_not_available.jpeg";
import "../css/account.css";
// const firebase = require("firebase");
// import {
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   makeStyles,
//   //   Button,
//   Grid,
//   // Link,
//   // Box,
//   // Copyright,
// } from "@material-ui/core";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

var firestore = firebase.firestore();

function AddprofilePicture(props) {
  // const fs = require("fs");
  // const cp = require("child_process");
  // var { spawn } = require("child_process");
  // var im = require("imagemagick");
  // const gm = require("gm");
  const { currentUser } = useContext(AuthContext);

  const docRef = firestore.doc("users/" + currentUser.uid);
  const [myFireBaseData, setMyFireBaseData] = useState(undefined);

  // console.log("docRef.get()", docRef.get());

  const [pwMatch, setPwMatch] = useState("");
  // console.log(currentUser);
  // console.log("props.username", props.username);

  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      console.log("overview Use effect fired");
      try {
        await docRef.get().then((doc) => {
          if (doc && doc.exists) {
            setMyFireBaseData(doc.data());
          }
        });
        // console.log("data", data.data());
        console.log("data", myFireBaseData);
      } catch (e) {
        console.log(e);
      }
    }
    // if (props.searchValue != null) {
    //   console.log("searchTerm is set");
    fetchData();
    // }
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, address, city, state, zip, profileImage } =
      event.target.elements;
    console.log("props.phone", profileImage.files[0].name);
    try {
      await doUpdateProfile(
        currentUser.uid,
        username.value,
        address.value,
        city.value,
        state.value,
        zip.value
        // phone.value.toString()
      );
      alert("Profile has been updated.");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {/* <Container>
        <Row>
          <Col lg={{ span: 4, offset: 3 }}>
            <Form
              action="http://localhost:8081/upload_file"
              method="post"
              enctype="multipart/form-data"
            >
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Select a File"
                  name="file"
                />
              </Form.Group>
              <Form.Group>
                <Button variant="info" type="submit">
                  Upload
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container> */}
      <Container>
        <Row className="border border-dark profile-box">
          <Col>
            <img src={image_not_available} alt="profils pic" />
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form" onSubmit={submitForm}>
              {/* <p>{this.state.msg}</p> */}
              <Form.Group controlId="formCategory1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  required
                  defaultValue={myFireBaseData.userDisplayName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  id="address"
                  name="address"
                  // defaultValue={myFireBaseData.userAddress}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  id="zip"
                  name="zip"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]{5}"
                  placeholder="Zip (input ex: 02302)"
                />
              </Form.Group>
              {/* <Form.Group controlId="formCategory2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={currentUser.phoneNumber}
                />
              </Form.Group> */}

              <Form.Group controlId="formCategory4">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" name="profileImage" required />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddprofilePicture;
