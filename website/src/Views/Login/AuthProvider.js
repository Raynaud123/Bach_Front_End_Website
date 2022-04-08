import React, {createContext, useState} from "react";
import Header from "../Header";
import Footer from "../Footer";
import {Route, Routes} from "react-router-dom";
import Home from "../Home";
import Login from "./Login";
import Register from "./Register";
import RequireAuth from "../RequireAuth";
import Topic from "../topics/Topic";
import AddTopic from "../topics/AddTopic";
import TopicInfo from "../topics/TopicInfo";
import Error404 from "../Error404";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const role = "student";

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            <Header
                isLoggedIn={auth.loggedIn}
                roles={role}
            />
          {/*{children}*/}
            <Routes>

                <Route path="/" element={
                    <Home/>
                }/>

                <Route path="/login" element={
                    <Login/>
                }/>
                <Route path="/register" element={
                    <Register/>
                }/>


                <Route element={<RequireAuth/>}>
                    <Route path="/topic" element={
                        <Topic
                            roles={role}
                        />
                    }/>
                    <Route path="/Add" element={<AddTopic
                        roles={role}
                    />}/>
                    <Route path="topics/info/:t" element={<TopicInfo
                        roles={role}
                    />}/>
                </Route>


                <Route path="*" element={<Error404
                    isLoggedIn={auth.loggedIn}
                />}/>
            </Routes>
            <Footer/>
        </AuthContext.Provider>
    )
}

export default AuthContext;