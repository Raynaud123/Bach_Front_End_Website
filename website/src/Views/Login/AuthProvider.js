import React, {createContext, useState} from "react";
import Header from "../HeaderAndFooter/Header";
import Footer from "../HeaderAndFooter/Footer";
import {Route, Routes} from "react-router-dom";
import Home from "../Home";
import Login from "./Login";
import Register from "./Register";
import RequireAuth from "../RequireAuth";
import Topic from "../topics/Topic";
import TopicAdd_CompanyAndPromotor from "../topics/TopicAdd_CompanyAndPromotor";
import TopicInfo from "../topics/TopicInfo";
import Error404 from "../Error404";
import TopicChoice_Student from "../AppUsers/Student/TopicChoice_Student";
import TopicAssign_Masterproef from "../AppUsers/Masterproefcoordinator/TopicAssign_Masterproef";
import Approve_Masterproef from "../AppUsers/Masterproefcoordinator/Approve_Masterproef";
import BoostStudent_Promotor from "../AppUsers/Promotor/BoostStudent_Promotor";
import Maintenance_Admin from "../AppUsers/Admin/Maintenance_Admin";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const role = "promotor";

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
                    <Route path="/topic" element={<Topic
                            roles={role}
                    />}/>
                    <Route path="/add" element={<TopicAdd_CompanyAndPromotor
                        roles={role}
                    />}/>
                    <Route path="topics/info/:t" element={<TopicInfo
                        roles={role}
                    />}/>
                    <Route path="choice" element={<TopicChoice_Student
                        roles={role}
                    />}/>
                    <Route path="assign" element={<TopicAssign_Masterproef
                        roles={role}
                    />}/>
                    <Route path="approve" element={<Approve_Masterproef
                        roles={role}
                    />}/>
                    <Route path="boost" element={<BoostStudent_Promotor
                        roles={role}
                    />}/>
                    <Route path="maintenance" element={<Maintenance_Admin
                        roles={role}
                    />}/>
                    {/*Nog routes voor admin*/}
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