import React, {useState} from "react";
import KULeuvenLogo from "../assets/KULeuvenLogo.png";
import {Link} from "react-router-dom";
import {GiHamburgerMenu, GoPerson, IoIosNotificationsOutline} from "react-icons/all";



export default function MobileHeader(props){


    const [navbarOpen, setNavbarOpen] = useState(false)

    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    if(!isLoggedIn){
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
            </div>
        )}else if(role === "admin"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/deadlines">Deadlines</Link>
                        <Link to="/maintenance">Maintenance</Link>
                        <Link to="/Topics">Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                            <GoPerson color='white' size={40}></GoPerson>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }else if(role === "student"){
        return(
            <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/Choice">Choice</Link>
                            <Link to="/Topics">Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                                <GoPerson color='white' size={40}></GoPerson>
                            </div>
                        </div>
                    </ul>}
            </div>
        )
    }else if(role === "masterProef"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/Topics">Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                            <GoPerson color='white' size={40}></GoPerson>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }else if(role === "bedrijf"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/Add">Add a Topic</Link>
                        <Link to="/Topics">Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}></IoIosNotificationsOutline>
                            <GoPerson color='white' size={40}></GoPerson>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }


}