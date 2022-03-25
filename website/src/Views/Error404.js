import React from "react";
import '../Styles/Error404.css'
import Footer from "./Footer";
import Header from "./Header"
import {Link} from "react-router-dom";

export default function Error404() {
    return(
        <div className={"height"}>
            <Header/>
            <div className={"content"}>
                <h1>Error 404: Page not found</h1>
                <p>Sorry, we can't find that page. Return to <Link to="/">Home</Link> or another valid page.</p>
                <button><Link to="/">Return to Home</Link></button>
            </div>
            <Footer/>
        </div>
    )
}
