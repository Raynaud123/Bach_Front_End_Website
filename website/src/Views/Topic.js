import React from 'react';
import Header from "./Header";
import Footer from "./Footer";

export default function Topic(props){

    return(
        <div>
            <Header
            isLoggedIn={props.isLoggedIn}
            roles={props.roles}
            />

            <Footer/>
        </div>
    )


}