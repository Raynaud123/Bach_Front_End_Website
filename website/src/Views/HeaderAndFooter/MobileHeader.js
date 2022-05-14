import React, {useState} from "react";
import KULeuvenLogo from "../../assets/KULeuvenLogo.png";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {GiHamburgerMenu, GoPerson, IoIosNotificationsOutline} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function MobileHeader(props){
    const [navbarOpen, setNavbarOpen] = useState(false)

    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const [PhaseFound, setPhaseFound] = useState(false);
    const [PhaseId, setPhaseId] = useState(2);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    let isMounted = true;
    const controller = new AbortController();
    const getPhase = async () => {
        try {
            const response = await axiosPrivate({
                method: "get",
                url: "/phase/now",
                signal: controller.signal
            });
            // console.log(response.data);
            isMounted && setPhaseId(response.data.phase_id);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
            console.log(errMsg);
        }
    }

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }

    if(!isLoggedIn || role === "NOTAPPROVED"){
        if(!PhaseFound){
            getPhase().then();
            setPhaseFound(true);
            return () => {
                isMounted = false;
                controller.abort();
            }
        }
        return(
            <div className={"header"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
            </div>
        )}
    else if(role === "ADMIN"){
        return(
            <div className={"header hamburger"}>
                <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                {navbarOpen && <ul className={"menuNav"}>
                    <div className={"hamburgerbuttons"}>
                        <Link to="/maintenance">Maintenance</Link>
                        <div className={"iconshamburger"}>
                            <IoIosNotificationsOutline color='white' size={50}/>
                            <GoPerson color='white' size={40}/>
                        </div>
                    </div>
                </ul>}
            </div>
        )
    }
    else if(role === "STUDENT"){
        if (PhaseId === 1){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/submittopicstudent">Submit Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>)
        }
        if (PhaseId === 2 || PhaseId === 5){
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
        }
        if (PhaseId === 3 || PhaseId === 4 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/viewchoice">Choice</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>
            )
        }
        else
            return null;
    }
    else if(role === "MASTER"){
        if (PhaseId === 1 || PhaseId === 2 || PhaseId === 3 || PhaseId === 5 || PhaseId === 6){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
                            <Link to="/approve">Approve</Link>
                            <Link to="/promotor/assing">Assign Promotor</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>)
        }
        if (PhaseId === 4 || PhaseId === 7){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
                            <Link to="/assign">Assign Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>
            )
        }
        else
            return null;

    }
    else if(role === "COMPANY"){
        if (PhaseId === 2 || PhaseId === 3 || PhaseId === 4 || PhaseId === 5 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>
            )
        }
        if (PhaseId === 1){
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
        }
        else
            return null;
    }
    else if(role === "PROMOTOR"){
        if (PhaseId === 2 || PhaseId === 4 || PhaseId === 5 || PhaseId === 7){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>
            )
        }
        if (PhaseId === 1){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
                            <Link to="/add">Add Topic</Link>
                            <div className={"iconshamburger"}>
                                <IoIosNotificationsOutline color='white' size={50}/>
                                <GoPerson color='white' size={40}/>
                            </div>
                        </div>
                    </ul>}
                </div>
            )
        }
        if (PhaseId === 3 || PhaseId === 6){
            return(
                <div className={"header hamburger"}>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    <GiHamburgerMenu size={50} className={"hamburgerbutton"} onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</GiHamburgerMenu>
                    {navbarOpen && <ul className={"menuNav"}>
                        <div className={"hamburgerbuttons"}>
                            <Link to="/topic">Topics</Link>
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
        else
            return null;
    }
}