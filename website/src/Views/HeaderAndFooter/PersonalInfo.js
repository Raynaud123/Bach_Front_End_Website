import React from 'react';
import PersonalInfo_Student from "../AppUsers/Student/PersonalInfo_Student"
import PersonalInfo_Admin from "../AppUsers/Admin/PersonalInfo_Admin"
import PersonalInfo_Masterproef from "../AppUsers/Masterproefcoordinator/PersonalInfo_Masterproef"
import PersonalInfo_Company from "../AppUsers/Company/PersonalInfo_Company"
import PersonalInfo_Promotor from "../AppUsers/Promotor/PersonalInfo_Promotor"




export default function Topic(props){

    switch(props.roles) {
        case "STUDENT":
            return <PersonalInfo_Student studentid={props.persoonid}/>
        case "ADMIN":
             return <PersonalInfo_Admin adminid={props.persoonid}/>
        case "MASTER":
             return <PersonalInfo_Masterproef masterid={props.persoonid}/>
        case "COMPANY":
             return <PersonalInfo_Company companyid={props.persoonid}/>
        case "PROMOTOR":
             return <PersonalInfo_Promotor promotorid={props.persoonid}/>
        case "NOTAPPROVED":
             return null
        default:
    }
}