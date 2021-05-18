import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import {
  doUpdateUserProfile,
  doUpdateProfile,
} from "../firebase/FirebaseFunctions";
// import SignOutButton from "./SignOut";
// import "../App.css";
// import ChangePassword from "./ChangePassword";
import image_not_available from "../css/image_not_available.jpeg";
import "../css/account.css";
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

function AddprofilePicture(props) {
  // const fs = require("fs");
  // const cp = require("child_process");
  // var { spawn } = require("child_process");
  // var im = require("imagemagick");
  // const gm = require("gm");
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  console.log(currentUser);
  console.log("props.username", props.username);

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, address, state, city, zip, profileImage } =
      event.target.elements;
    console.log("props.phone", profileImage.files[0].name);
    try {
      await doUpdateProfile(
        username.value
        // address.value
        // phone.value.toString()
      );
      alert("Profile has been updated.");
    } catch (error) {
      alert(error);
    }
    // const path = "../css/image_not_available.jpeg"
    // const newpath = "../css/images/image_not_available.jpeg"

    // gm("../css/image_not_available.jpeg")
    //   .resize(100, 100)
    //   // .noProfile()
    //   .write("../css/images/image_not_available.jpeg", function (err) {
    //     if (err) {
    //       console.log(err);
    //       console.log(profileImage.value);
    //     }
    //     console.log("convertion completed");
    //   });

    // im.convert('kittens.jpg', function(err, metadata){
    //   if (err) throw err;
    //   console.log('Shot at '+metadata.exif.dateTimeOriginal);
    // })

    // im.resize(
    //   {
    //     srcPath: image_not_available,
    //     dstPath: "../css/images/image_not_available.jpeg",
    //     width: 100,
    //   },
    //   function (err, stdout, stderr) {
    //     if (err) throw err;
    //     console.log("resized kittens.jpg to fit within 256x256px");
    //   }
    // );
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
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  required
                  defaultValue={currentUser.displayName}
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  id="address"
                  name="address"
                  defaultValue={currentUser.gb}
                  required
                />
              </Form.Group> */}
              {/* <Form.Group as={Col} md="6">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                />
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  id="zip"
                  name="zip"
                  placeholder="Zip"
                />
              </Form.Group> */}
              {/* <Form.Group controlId="formCategory2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={currentUser.phoneNumber}
                />
              </Form.Group> */}

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
