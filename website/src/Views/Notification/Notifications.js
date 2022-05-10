import React from 'react';
import Notifications_Student from "../AppUsers/Student/Notifications_Student"
import Notifications_Admin from "../AppUsers/Admin/Notifications_Admin"
import Notifications_Masterproef from "../AppUsers/Masterproefcoordinator/Notifications_Masterproef"
import Notifications_Company from "../AppUsers/Company/Notifications_Company"
import Notifications_Promotor from "../AppUsers/Promotor/Notifications_Promotor"

export default function Notifications(props){

    switch(props.roles) {
        case "STUDENT":
            return <Notifications_Student persoonid={props.persoonid}/>
        case "ADMIN":
            return <Notifications_Admin persoonid={props.persoonid}/>
        case "MASTER":
            return <Notifications_Masterproef persoonid={props.persoonid}/>
        case "COMPANY":
            return <Notifications_Company persoonid={props.persoonid}/>
        case "PROMOTOR":
            return <Notifications_Promotor persoonid={props.persoonid}/>
        case "NOTAPPROVED":
            return null
        default:
    }
}