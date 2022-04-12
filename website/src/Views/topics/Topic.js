import React from 'react';
import Topic_Student from "../AppUsers/Student/Topic_Student"
import Topic_Company from "../AppUsers/Company/Topic_Company";
import Topic_Admin from "../AppUsers/Admin/Topic_Admin";
import Topic_Masterproef from "../AppUsers/Masterproefcoordinator/Topic_Masterproef";
import Topic_Promotor from "../AppUsers/Promotor/Topic_Promotor";
import Topic_Not from "./Topic_Not"



export default function Topic(props){

    switch(props.roles) {
        case "STUDENT":
            return <Topic_Student/>
        case "ADMIN":
            return <Topic_Admin/>
        case "MASTER":
            return <Topic_Masterproef/>
        case "COMPANY":
            return <Topic_Company/>
        case "PROMOTOR":
            return <Topic_Promotor/>
        case "NOTAPPROVED":
            return <Topic_Not/>
    }
}