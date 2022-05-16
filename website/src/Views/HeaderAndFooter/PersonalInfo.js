import React from 'react';
import PersonalInfo_Student from "../AppUsers/Student/PersonalInfo_Student"
import PersonalInfo_Admin from "../AppUsers/Admin/PersonalInfo_Admin"
import PersonalInfo_Masterproef from "../AppUsers/Masterproefcoordinator/PersonalInfo_Masterproef"
import PersonalInfo_Company from "../AppUsers/Company/PersonalInfo_Company"
import PersonalInfo_Promotor from "../AppUsers/Promotor/PersonalInfo_Promotor"
import "../../Styles/Home.css"
import Logout from "../Login/Logout"


export default function PersonalInfo(props){

    switch(props.roles) {
        case "STUDENT":
            return (
                <div className={"standaard"}>
                    <PersonalInfo_Student studentid={props.persoonid}/>
                    <Logout/>
                </div>
            )
        case "ADMIN":
             return (
                 <div className={"standaard"}>
                     <PersonalInfo_Admin adminid={props.persoonid}/>
                     <Logout/>
                 </div>
             )
        case "MASTER":
             return (<div className={"standaard"}>
                     <PersonalInfo_Masterproef masterid={props.persoonid}/>
                    <Logout/>
             </div>)

        case "COMPANY":
             return (<div className={"standaard"}>
                     <PersonalInfo_Company companyid={props.persoonid}/>
                     <Logout/>
             </div>)

        case "PROMOTOR":
             return (<div className={"standaard"}>
                     <PersonalInfo_Promotor promotorid={props.persoonid}/>
                 <Logout/>
             </div>)

        case "NOTAPPROVED":
             return null
        default:
    }
}