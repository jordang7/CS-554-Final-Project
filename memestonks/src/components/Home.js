import React from "react";
import SignOut from './SignOut';
import '../css/home.css'
import {
    Link
} from "react-router-dom";
import logo from '../css/images/logo_meme.png'
import { findRenderedDOMComponentWithClass } from "react-dom/cjs/react-dom-test-utils.development";
function Root() {
    return (
        <div>
            <img src={logo} alt="logo" className="logo" />
            <div>
                <div className="description">
                    <p> A meme stock is a stock that has seen an increase in volume not because of the
                    company’s performance, but rather because of hype on social media and online forums like Reddit. </p>

                    <p> Examples of meme stocks include GameStop, AMC, and BlackBerry. While the companies themselves have not performed well in recent years,
                    all three stocks went viral on a popular Reddit forum and saw massive price increases in
                    late January 2021, specifically Jan. 27. BlackBerry’s stock more than tripled, while AMC increased by nearly tenfold.
                </p>
                </div>
            </div>
                <div className="homepage-links">
                <fieldset className="fieldsets">
                    <br/>
                    <div>
                        <p>Already have an account?</p>
                        <Link className="btn btn-dark"to="/signin">Sign in!</Link>
                    </div>
                    <br />
                    <div>
                        <p>Don't have an account?</p>
                        <Link className="btn btn-dark"to="/signup">Sign Up!</Link>
                    </div>
                    <br />
            </fieldset>
            </div>

        </div>
    );
}

export default Root;