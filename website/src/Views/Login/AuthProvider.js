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
    const role = auth.role;
    const id = auth.id;

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
                            persoonid = {id}
                    />}/>
                    <Route path="/add" element={<TopicAdd_CompanyAndPromotor
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="topics/info/:topicid" element={<TopicInfo
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="choice" element={<TopicChoice_Student
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="assign" element={<TopicAssign_Masterproef
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="approve" element={<Approve_Masterproef
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="boost" element={<BoostStudent_Promotor
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="maintenance" element={<Maintenance_Admin
                        roles={role}
                        persoonid = {id}
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