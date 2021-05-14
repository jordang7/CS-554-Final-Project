import React from "react";
import SignOut from './SignOut';
import {
    Link
} from "react-router-dom";
function Root() {
    return (
        <div>
            <h1>MEMESTONKS</h1>
            <div>
                <Link to="/stock-chart">Click here for real time stock prices</Link>
            </div>
            <br />
            <div>
                <Link to="/signin">Click here to Sign in!</Link>
            </div>
            <br />
            <div>
                <Link to="/signup">Click here to Sign Up!</Link>
            </div>
            <br />
            <div>
                <br />
                <br />
                <div className="description">
                    <p> A meme stock is a stock that has seen an increase in volume not because of the
                    company’s performance, but rather because of hype on social media and online forums like Reddit. </p>

                    <p> Examples of meme stocks include GameStop, AMC, and BlackBerry. While the companies themselves have not performed well in recent years,
                    all three stocks went viral on a popular Reddit forum and saw massive price increases in
                    late January 2021, specifically Jan. 27. BlackBerry’s stock more than tripled, while AMC increased by nearly tenfold.
                </p>
                </div>
            </div>

            <SignOut />
        </div>
    );
}

export default Root;