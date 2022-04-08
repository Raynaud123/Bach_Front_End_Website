import React, {useState} from "react";
import KULeuvenLogo from "../../assets/KULeuvenLogo.png";
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
                        <Link to="/topic">Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}/>
                            <GoPerson color='white' size={40}/>
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
                            <Link to="/choice">Choice</Link>
                            <Link to="/topic">Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
            </div>
        )
    }else if(role === "masterproef"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/topic">Topics</Link>
                        <Link to="/assign">Assign Topics</Link>
                        <Link to="/approve">Approve Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}/>
                            <GoPerson color='white' size={40}/>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }else if(role === "company"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/add">Add Topic</Link>
                        <Link to="/topic">Topics</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}/>
                            <GoPerson color='white' size={40}/>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }else if(role === "promotor"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/topic">Topics</Link>
                        <Link to="/add">Add Topic</Link>
                        <Link to="/boost">boost Student</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}/>
                            <GoPerson color='white' size={40}/>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }
}