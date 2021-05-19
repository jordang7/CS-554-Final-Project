import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
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

import Resizer from "react-image-file-resizer";
const axios = require("axios");

var firestore = firebase.firestore();
var storage = firebase.storage();

function AddprofilePicture(props) {
  // const fs = require("fs");
  // const cp = require("child_process");
  // var { spawn } = require("child_process");
  // var im = require("imagemagick");
  // const gm = require("gm");
  // const sharp = require("sharp");

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
          // console.log(uri);
        },
        "file"
      );
    });
  // const resizeFile = (file) => {
  //   Resizer.imageFileResizer(file, 250, 250, "JPEG", 100, 0, uri, "base64");
  // };

  const { currentUser } = useContext(AuthContext);

  const [myFireBaseData, setMyFireBaseData] = useState(undefined);

  const docRef = firestore.doc("users/" + currentUser.uid);
  // console.log("currentUser.uid", await docRef.get());

  // console.log("docRef.get()", docRef.get());

  const [uploadImage, setUploadImage] = useState(image_not_available);
  console.log(currentUser);
  // console.log("props.username", props.username);

  let name = currentUser.displayName;
  let address = "";
  let city = "";
  let state = "";
  let zip = "";
  var image = image_not_available;

  if (myFireBaseData != undefined) {
    name = myFireBaseData.userDisplayName;
    address = myFireBaseData.userAddress;
    city = myFireBaseData.userCity;
    state = myFireBaseData.userState;
    zip = myFireBaseData.userZip;
  }

  useEffect(() => {
    console.log("overview Use effect fired");
    async function fetchData() {
      // console.log("overview Use effect fired");
      await docRef.get().then((doc) => {
        // console.log(doc.data());
        if (doc && doc.exists) {
          setMyFireBaseData(doc.data());
        }
      });
      // console.log("data", myFireBaseData);

      // console.log("uid", currentUser.uid);
      // console.log("photoURL", currentUser.photoURL);
      // try {
      // gs://cs-544-final-project.appspot.com/images/wlgNeKSRfZdNRpaQG7n0In5DY3f2"/"26232231_10156194534018313_5006561031199576864_o.jpg
      // console.log(
      //   "imageurl",
      //   storage
      //     .ref("images/" + currentUser.uid)
      //     .child("profileImage")
      //     .getDownloadURL()
      // );
      await storage
        .ref("images/" + currentUser.uid)
        .child("profileImage")
        .getDownloadURL()
        .then((imageUrl) => {
          // image = imageUrl;
          setUploadImage(imageUrl);
          console.log("imageurl", imageUrl);
        });
      // } catch (e) {
      //   console.log("error image", e);
      // }
    }
    fetchData();
  }, []);

  var imageResized = "";
  const submitForm = async (event) => {
    event.preventDefault();
    const { username, address, city, state, zip, profileImage } =
      event.target.elements;
    console.log("props.phone", profileImage.files[0]);

    const file = profileImage.files[0];
    imageResized = await resizeFile(file);
    // console.log(imageResized);

    // let axiosConfig = {
    //   headers: {
    //     "Content-Type": "application/json;",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };

    // const data = new FormData();
    // data.append("file", profileImage.files[0]);
    // console.log(data);

    // // .post("http://localhost:8080/imageResize", profileImage.files[0])
    // const value = await axios
    //   .post(
    //     "http://localhost:8080/imageResize",
    //     data
    //     // { body: new FormData(profileImage.files[0]) }
    //     // { imageForm: formData(profileImage.files[0]) }
    //     // axiosConfig
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // console.log("kuch toh hua", value);
    // await sharp(profileImage.files[0])
    //   .resize(300, 200)
    //   .png()
    //   .tofile("../css/images");
    try {
      await doUpdateProfile(
        currentUser.uid,
        username.value,
        address.value,
        city.value,
        state.value,
        zip.value,
        imageResized,
        currentUser.photoURL
      );
      alert("Profile has been updated.");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="border border-dark profile-box">
          <Col>
            <img className="img-size" src={uploadImage} alt="profile pic" />
          </Col>
          <Col>
            <h1>User Profile</h1>
            <Form className="form" onSubmit={submitForm}>
              {/* <p>{this.state.msg}</p> */}
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  required
                  defaultValue={name}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  id="address"
                  name="address"
                  defaultValue={address}
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
                  defaultValue={city}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  defaultValue={state}
                />
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  placeholder="Zip (input ex: 02302)"
                  defaultValue={zip}
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
              <br></br>
              <Form.Group>
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  required
                />
              </Form.Group>
              <br></br>
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
