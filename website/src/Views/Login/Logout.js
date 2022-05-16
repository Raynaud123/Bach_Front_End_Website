import React, { useEffect, useRef, useState} from 'react';
import axios from 'axios';
import "../../Styles/Register.css"
import useAuth from "../../Hooks/useAuth";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {axiosPrivate} from "../../axios";
import {BiJoystickButton} from "react-icons/all";

export default function Logout(){

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();


    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState();
    const [accesToken, setAccesToken] = useState('');
    const [loggedIn, setloggedIn] = useState(false);
    const [errMsg, setErrMsg] = useState('');



    function handleLogout(event){
        setUser(null);
        setPwd(null);
        setRole(null);
        setAccesToken(null);
        setId(null);
        setloggedIn(false);
        const accesTokenVar = accesToken;
        //console.log(role);
        setAuth({ user, pwd, loggedIn, accesTokenVar, role, id});
        navigate("/login", { replace: true });
    }




    return(
           <div>
               <button
                   onClick={handleLogout}
               >
                   Log out
               </button>
           </div>
       )
}