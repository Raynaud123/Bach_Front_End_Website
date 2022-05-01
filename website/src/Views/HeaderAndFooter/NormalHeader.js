import React, {useEffect, useState} from "react";
import '../../Styles/Header.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import KULeuvenLogo from '../../assets/KULeuvenLogo.png'
import {GoPerson, IoIosNotificationsOutline} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const [PhaseFound, setPhaseFound] = useState(false);
    const [PhaseId, setPhaseId] = useState(-1);


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


    if(!isLoggedIn || role === "NOTAPPROVED"){
        if(!PhaseFound){
            getPhase().then();
            setPhaseFound(true);
            return () => {
                isMounted = false;
                controller.abort();
            }
        }
        else {
            console.log("PhaseId: " + PhaseId);
        }
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
    }
    else if(role === "ADMIN"){
        return(
            <div className={"header"}>
                <a href='/'>
                    <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                </a>
                <div className={"buttons"}>
                    <button><Link to="/maintenance">Maintenance</Link></button>
                    <button><Link to="/topic">Topics</Link></button>
                </div>
                <div className={"icon"}>
                    <IoIosNotificationsOutline color='white' size={50}/>
                    <GoPerson color='white' size={50}/>
                </div>
            </div>
        )
    }
    else if(role === "STUDENT"){
        if (PhaseId === 1){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/submittopicstudent">Submit Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        if (PhaseId === 2 || PhaseId === 5){
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
        }
        if (PhaseId === 3 || PhaseId === 4 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/viewchoice">Choice</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        else
            return null;
    }
    else if(role === "MASTER"){
        if (PhaseId === 1 || PhaseId === 2 || PhaseId === 3 || PhaseId === 5 || PhaseId === 6){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/approve">Approve Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        if (PhaseId === 4 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/assign">Assign Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        else
            return null;
    }
    else if(role === "COMPANY"){
        if (PhaseId === 2 || PhaseId === 3 || PhaseId === 4 || PhaseId === 5 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        if (PhaseId === 1){
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
        }
        else
            return null;
    }
    else if(role === "PROMOTOR"){
        if (PhaseId === 2 || PhaseId === 4 || PhaseId === 5 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        if (PhaseId === 1){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/add">Add Topic</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        if (PhaseId === 3 || PhaseId === 6){
            return(
                <div className={"header"}>
                    <a href='/'>
                        <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
                    </a>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/boost">Boost student</Link></button>
                    </div>
                    <div className={"icon"}>
                        <IoIosNotificationsOutline color='white' size={50}/>
                        <GoPerson color='white' size={40}/>
                    </div>
                </div>
            )
        }
        else
            return null;
    }
}