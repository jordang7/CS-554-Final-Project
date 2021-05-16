import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { doUpdateUserProfile } from "../firebase/FirebaseFunctions";
// import SignOutButton from "./SignOut";
// import "../App.css";
// import ChangePassword from "./ChangePassword";
import image_not_available from "../css/image_not_available.jpeg";
import "../css/account.css";
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  makeStyles,
  //   Button,
  Grid,
  // Link,
  // Box,
  // Copyright,
} from "@material-ui/core";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AddprofilePicture() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  console.log(currentUser);

  const submitForm = async (event) => {
    event.preventDefault();
    const { username, email, profileImage } = event.target.elements;

    // if (newPasswordOne.value !== newPasswordTwo.value) {
    //   setPwMatch("New Passwords do not match, please try again");
    //   return false;
    // }

    try {
      await doUpdateUserProfile(
        username.value,
        email.value,
        profileImage.value
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
                <Form.Control type="text" name="username" required />
              </Form.Group>
              <Form.Group controlId="formCategory2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>

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
