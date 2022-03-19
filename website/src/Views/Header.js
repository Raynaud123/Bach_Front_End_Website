import React from "react";
import '../Styles/Header.css';
import KULeuvenLogo from '../assets/KULeuvenLogo.png'

export default function Header(){
    return(
        <div className={"header"}>
            <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
        </div>
    )
}