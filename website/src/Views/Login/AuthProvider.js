import React, {createContext, useState} from "react";
import Header from "../HeaderAndFooter/Header";
import Footer from "../HeaderAndFooter/Footer";
import {Route, Routes} from "react-router-dom";
import Home from "../HeaderAndFooter/Home";
import Login from "./Login";
import Register from "./Register";
import RequireAuth from "../RequireAuth";
import Topic from "../topics/Topic";
import Logout from "../Login/Logout"
import TopicAdd_CompanyAndPromotor from "../topics/TopicAdd_CompanyAndPromotor";
import TopicInfo from "../topics/TopicInfo";
import Error404 from "../Error404";
import TopicChoice_Student from "../AppUsers/Student/TopicChoice_Student";
import TopicAssign_Masterproef from "../AppUsers/Masterproefcoordinator/TopicAssign_Masterproef";
import Approve_Masterproef from "../AppUsers/Masterproefcoordinator/Approve_Masterproef";
import BoostStudent_Promotor from "../AppUsers/Promotor/BoostStudent_Promotor";
import Maintenance_Admin from "../AppUsers/Admin/Maintenance_Admin";
import ViewChoice_Student from "../AppUsers/Student/ViewChoice_Student";
import SubmitTopic_Student from "../AppUsers/Student/SubmitTopic_Student";
import PersonalInfo from "../HeaderAndFooter/PersonalInfo";
import Notifications from "../HeaderAndFooter/Notifications";
import NotificationInfo from "../Notification/NotificationInfo";
import Home_Standaard from "../Home_Standaard";
import Unauthorized from "../Login/Unauthorized"
import * as PropTypes from "prop-types";



const AuthContext = createContext({});

// function Logout(props) {
//     return null;
// }
//
// Logout.propTypes = {
//     roles: PropTypes.any,
//     persoonid: PropTypes.any
// };
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
                    <Home_Standaard/>
                }/>

                <Route path="/login" element={
                    <Login/>
                }/>
                <Route path="/register" element={
                    <Register/>
                }/>
                <Route path="/logout" element={
                    <Logout/>
                }/>
                <Route element={<RequireAuth/>}>
                    <Route path="/home" element={<Home
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="/unauthorized" element={<Unauthorized
                        roles={role}
                        persoonid ={id}
                    />}/>
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
                    <Route path="approve/:notification_id/:object_name/:object_id" element={<NotificationInfo
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="choice" element={<TopicChoice_Student
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="viewchoice" element={<ViewChoice_Student
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="submittopicstudent" element={<SubmitTopic_Student
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="personalinfo" element={<PersonalInfo
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="notifications" element={<Notifications
                        roles={role}
                        persoonid = {id}
                    />}/>
                    PersonInfo_Student
                    <Route path="assign" element={<TopicAssign_Masterproef
                        roles={role}
                        persoonid = {id}
                    />}/>
                    <Route path="approve" element={<Approve_Masterproef
                        roles={role}
                        persoonid = {id}
                    />}/>
                    {/*<Route path="boost" element={<BoostStudent_Promotor*/}
                    {/*    roles={role}*/}
                    {/*    persoonid = {id}*/}
                    {/*/>}/>*/}
                    <Route path="maintenance" element={<Maintenance_Admin
                        roles={role}
                        persoonid = {id}
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