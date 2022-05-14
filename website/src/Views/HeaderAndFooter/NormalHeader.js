import React, {useEffect, useState} from "react";
import '../../Styles/Header.css';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import KULeuvenLogo from '../../assets/KULeuvenLogo.png'
import {GoPerson, IoIosNotificationsOutline} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

function Icons() {
    return (
    <div className={"icon"}>
        <Link to="/Notifications"><IoIosNotificationsOutline color='white' size={50}/></Link>
        <Link to="/PersonalInfo"><GoPerson color='white' size={40}/></Link>
    </div>
    );
}

function HomeButton() {
    return (
        <Link to="/Home">
            <img className={"Logo"} src={KULeuvenLogo} alt={"KU Leuven logo"}/>
        </Link>
    );
}

export default function NormalHeader(props){
    const role = props.roles;
    const isLoggedIn = props.isLoggedIn;

    const [PhaseFound, setPhaseFound] = useState(false);
    const [PhaseId, setPhaseId] = useState(1);


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
        // if(!PhaseFound){
        //     getPhase().then();
        //     setPhaseFound(true);
        //     return () => {
        //         isMounted = false;
        //         controller.abort();
        //     }
        // }
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
                <HomeButton/>
                <div className={"buttons"}>
                    <button><Link to="/maintenance">Maintenance</Link></button>
                </div>
                <Icons/>
            </div>
        )
    }
    else if(role === "STUDENT"){
        if (PhaseId === 1){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/submittopicstudent">Submit Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 2 || PhaseId === 5){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/choice">Choice</Link></button>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 3 || PhaseId === 4 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/viewchoice">Choice</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        else return null;
    }
    else if(role === "MASTER"){
        if (PhaseId === 1 || PhaseId === 2 || PhaseId === 3 || PhaseId === 5 || PhaseId === 6){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/approve">Approve</Link></button>
                        <button><Link to="/promotor/assign">Assign</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 4 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/assign">Assign Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        else return null;
    }
    else if(role === "COMPANY"){
        if (PhaseId === 2 || PhaseId === 3 || PhaseId === 4 || PhaseId === 5 || PhaseId === 6 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 1){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/add">Add Topic</Link></button>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        else return null;
    }
    else if(role === "PROMOTOR"){
        if (PhaseId === 2 || PhaseId === 4 || PhaseId === 5 || PhaseId === 7){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 1){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        <button><Link to="/add">Add Topic</Link></button>
                    </div>
                    <Icons/>
                </div>
            )
        }
        if (PhaseId === 3 || PhaseId === 6){
            return(
                <div className={"header"}>
                    <HomeButton/>
                    <div className={"buttons"}>
                        <button><Link to="/topic">Topics</Link></button>
                        {/*<button><Link to="/boost">Boost student</Link></button>*/}
                    </div>
                    <Icons/>
                </div>
            )
        }
        else return null;
    }
}