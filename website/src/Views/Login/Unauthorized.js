import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function Home_Company(props) {

    return(
        <div>
            <p>You are not authorized to do this, return to <Link to="/home">Home</Link></p>
        </div>
    )
}