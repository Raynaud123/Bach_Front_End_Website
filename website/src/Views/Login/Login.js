import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import AuthContext from "./AuthProvider";
import "../../Styles/Register.css"
import qs from "qs";


export default function Login(){

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
                url: "http://localhost:8080/login",
                data: qs.stringify({'email': user,'password' : pwd}),
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            });
            console.log(JSON.stringify(response.data));
            //console.log(JSON.stringify(response));
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            const roles = response.data.roles;
            setAuth({ user, pwd, roles, accessToken, refreshToken });
            setUser('');
            setPwd('');
            setSuccess(true);
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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                    </p>
                </section>
            ) : (
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
            )}
        </>
    )
}