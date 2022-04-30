import React, {useEffect, useState} from "react";
import '../../Styles/Header.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import KULeuvenLogo from '../../assets/KULeuvenLogo.png'
import {GoPerson, IoIosNotificationsOutline} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const [Phases, setPhases] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (isLoggedIn){
            const getPhases = async () => {
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/phase/all",
                        signal: controller.signal
                    });
                    const myData = [].concat(response.data).sort((a, b) => a.phase_id > b.phase_id ? 1 : -1);
                    console.log(response.data);
                    isMounted && setPhases(myData);
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                    console.log(errMsg);
                }
            }
            getPhases().then();
        }
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function getPhase() {
        const date = new Date();
        console.log("Date: " + date);
        console.log("Phases length: " + Phases.length);
        for(let i = 0; i<Phases.length; i++){
            const phase = JSON.parse(Phases[i]);
            console.log("Phase: " + phase);
            if(date.getFullYear() === phase.begin_deadline)
                return phase.begin_deadline;
            console.log("Phase begin: " + phase.begin_deadline);
        }
    }
    const phase = getPhase();




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