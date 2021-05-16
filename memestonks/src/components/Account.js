import React from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import ChangePassword from "./ChangePassword";
import AddProfilePicture from "./addProfilePicture";

function Account() {
  return (
    <div>
      <div className="account-heading">
        <h2>Account Page</h2>
      </div>
      <AddProfilePicture />
      <ChangePassword />
      <SignOutButton />
    </div>
  );
}

export default Account;
