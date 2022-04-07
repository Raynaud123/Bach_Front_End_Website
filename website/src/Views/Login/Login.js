import React, { useEffect, useRef, useState} from 'react';
import axios from 'axios';
import "../../Styles/Register.css"
import useAuth from "../../Hooks/useAuth";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {axiosPrivate} from "../../axios";

export default function Login(){

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    let from = "/";

    if(!(location.state === undefined || location.state === null)){
        from =  location.state.from.pathname;
    }



    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8080/appuser/authenticate",
                headers: {
                    "Content-Type" : "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                data: JSON.stringify({'username': user,'password' : pwd})
            });
            console.log(JSON.stringify(response));
            const accessToken = response.data.jwt;
//            const roles = response.data.roles;
            setAuth({ user, pwd, accessToken});
            setUser('');
            setPwd('');
//            setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }




    return(
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register"/>
                        </span>
                    </p>
                </section>
    )
}