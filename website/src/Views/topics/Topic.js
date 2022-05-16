import React from 'react';
import Topic_Student from "../AppUsers/Student/Topic_Student"
import Topic_Company from "../AppUsers/Company/Topic_Company";
import Topic_Admin from "../AppUsers/Admin/Topic_Admin";
import Topic_Masterproef from "../AppUsers/Masterproefcoordinator/Topic_Masterproef";
import Topic_Not from "./Topic_Not"
import BoostStudent_Promotor from "../AppUsers/Promotor/BoostStudent_Promotor";


export default function Topic(props){

    switch(props.roles) {
        case "STUDENT":
            return <Topic_Student studentid={props.persoonid}/>
        case "ADMIN":
            return <Topic_Admin adminid={props.persoonid}/>
        case "MASTER":
            return <Topic_Masterproef masterid={props.persoonid}/>
        case "COMPANY":
            return <Topic_Company companyid={props.persoonid}/>
        case "PROMOTOR":
            return <BoostStudent_Promotor promotorid={props.persoonid}/>
        case "NOTAPPROVED":
            return <Topic_Not/>
        default:
    }
}