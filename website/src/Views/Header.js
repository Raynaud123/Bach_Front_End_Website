import React from "react";
import '../Styles/Header.css';
import {Link} from 'react-router-dom'
import KULeuvenLogo from '../assets/KULeuvenLogo.png'

export default function Header(props){

    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    if(!isLoggedIn){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
            </div>
        )
    }else if(role === "admin"){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <div className={"buttons"}>
                        <button><Link to="/deadlines">Deadlines</Link></button>
                        <button><Link to="/maintenance">Maintenance</Link></button>
                        <button><Link to="/Topics">Topics</Link></button>
                </div>
            </div>
        )
    }else if(role === "student"){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <div className={"buttons"}>
                        <button><Link to="/Choice">Choice</Link></button>
                        <button><Link to="/Topics">Topics</Link></button>
                </div>
            </div>
        )
    }else if(role === "masterProef"){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <div className={"buttons"}>
                        <button><Link to="/Topics">Topics</Link></button>
                </div>
            </div>
        )
    }else if(role === "bedrijf"){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <div className={"buttons"}>
                        <button><Link to="/Add">Add a Topic</Link></button>
                        <button><Link to="/Topics">Topics</Link></button>
                </div>
            </div>
        )
    }

}