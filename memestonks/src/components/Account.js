import React from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import "../css/account.css";
import ChangePassword from "./ChangePassword";
import AddProfilePicture from "./addProfilePicture";

function Account() {
  return (
    <div>
      <div className="heading-name">
        <h2>Account Page</h2>
      </div>
      <AddProfilePicture />
      <ChangePassword />
      <SignOutButton />
    </div>
  );
}

export default Account;
