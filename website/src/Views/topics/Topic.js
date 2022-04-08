import React from 'react';
import Topic_Student from "../AppUsers/Student/Topic_Student"
import Topic_Company from "../AppUsers/Company/Topic_Company";
import Topic_Admin from "../AppUsers/Admin/Topic_Admin";
import Topic_Masterproef from "../AppUsers/Masterproefcoordinator/Topic_Masterproef";
import Topic_Promotor from "../AppUsers/Promotor/Topic_Promotor";


export default function Topic(props){

    switch(props.roles) {
        case "student":
            return <Topic_Student/>
        case "admin":
            return <Topic_Admin/>
        case "masterproef":
            return <Topic_Masterproef/>
        case "company":
            return <Topic_Company/>
        case "promotor":
            return <Topic_Promotor/>
    }
}