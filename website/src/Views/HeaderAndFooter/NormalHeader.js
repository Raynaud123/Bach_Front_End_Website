import React from "react";
import '../../Styles/Header.css';
import {Link} from 'react-router-dom'
import KULeuvenLogo from '../../assets/KULeuvenLogo.png'
import {GoPerson, IoIosNotificationsOutline} from "react-icons/all";

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;



    if(!isLoggedIn || role === "NOTAPPROVED"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <button><Link to="/">Home</Link></button>
                <button><Link to="/login">Login</Link></button>
                <button><Link to="/register">Registreren</Link></button>
            </div>
        )
    }else if(role === "ADMIN"){
        return(
            <div className={"header"}>
                <div>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/deadlines">Deadlines</Link></button>
                        <button><Link to="/maintenance">Maintenance</Link></button>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={50}/>
                    </div>
                </div>
            </div>
        )
    }else if(role === "STUDENT"){
        return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/choice">Choice</Link></button>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
        )
    }else if(role === "MASTER"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/topic">Topics</Link></button>
                    <button><Link to="/assign">Assign Topics</Link></button>
                    <button><Link to="/approve">Approve Topics</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }else if(role === "COMPANY"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/add">Add Topic</Link></button>
                    <button><Link to="/topic">Topics</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }else if(role === "PROMOTOR"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/topic">Topics</Link></button>
                    <button><Link to="/add">Add Topic</Link></button>
                    <button><Link to="/boost">Boost student</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }
}