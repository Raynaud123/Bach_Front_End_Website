import React from "react";
import '../Styles/Header.css';
import {Link} from 'react-router-dom'
import KULeuvenLogo from '../assets/KULeuvenLogo.png'
import {GoPerson, IoIosNotificationsOutline} from "react-icons/all";

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;



    if(!isLoggedIn){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
            </div>
        )
    }else if(role === "admin"){
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
    }else if(role === "student"){
        return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/Choice">Choice</Link></button>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
        )
    }else if(role === "masterProef"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/topic">Topics</Link></button>
                    <button><Link to="/assign">Topics</Link></button>
                    <button><Link to="/approve">Topics</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }else if(role === "company"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/Add">Add a Topic</Link></button>
                    <button><Link to="/topic">Topics</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }else if(role === "promotor"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/topic">Topics</Link></button>
                    <button><Link to="/boost">Boost a student</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={40}/>
                </div>
            </div>
        )
    }
}