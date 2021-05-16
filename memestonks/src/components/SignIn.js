import React, { useContext } from "react";
// import SocialSignIn from './SocialSignIn';
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Button,
  Grid,
  // Link,
  // Box,
  // Copyright,
} from "@material-ui/core";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   height: "100vh",
  // },
  // image: {
  //   backgroundImage: "url(https://source.unsplash.com/random)",
  //   backgroundRepeat: "no-repeat",
  //   backgroundColor:
  //     theme.palette.type === "light"
  //       ? theme.palette.grey[50]
  //       : theme.palette.grey[900],
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // form: {
  //   width: "100%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
}));

function SignIn() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
      doPasswordReset(email);
      alert("Password reset email was sent");
    } else {
      alert(
        "Please enter an email address below before you click the forgot password link"
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/account" />;
  }
  return (
    <div className={classes.paper}>
      {/* <h1>Log in</h1> */}

      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <TextField
            variant="outlined"
            margin="normal"
            label="Email Address"
            autoComplete="email"
            autoFocus
            className="form-control"
            name="email"
            id="email"
            type="email"
            // placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            id="password"
            autoComplete="current-password"
            className="form-control"
            name="password"
            type="password"
            // placeholder="Password"
            required
          />
        </div>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs={12}>
            <Link href="#" variant="body2" onClick={passwordReset}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to="/signup" variant="body2">
              "Don't have an account? Sign Up"
            </Link>
          </Grid>
        </Grid>
        {/* <Box mt={5}>
          <Copyright />
        </Box> */}
      </form>
      {/* <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit">Log in</button>

        <button className="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form> */}
      <br />
      {/* <SocialSignIn /> */}
    </div>
  );
}

export default SignIn;
