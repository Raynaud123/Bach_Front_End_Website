import React from "react";
import '../Styles/Header.css';
import {Link} from 'react-router-dom'
import KULeuvenLogo from '../assets/KULeuvenLogo.png'
import {IoIosNotificationsOutline, GoPerson} from "react-icons/all";

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;



    if(!isLoggedIn){
        return(
            <div className={"header"}>
                {/*<a> href='../index'*/}
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                {/*</a>*/}
            </div>
        )
    }else if(role === "admin"){
        return(
            <div className={"header"}>
                <div>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <div className={"buttons"}>
                        <button><Link to="/deadlines">Deadlines</Link></button>
                        <button><Link to="/maintenance">Maintenance</Link></button>
                        <button><Link to="/Topics">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                        <GoPerson color='white' size={50}></GoPerson>
                    </div>
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
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                        <GoPerson color='white' size={40}></GoPerson>
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
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                    <GoPerson color='white' size={40}></GoPerson>
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
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                    <GoPerson color='white' size={40}></GoPerson>
                </div>
            </div>
        )
    }
}