import React from 'react';
import Home_Student from "../AppUsers/Student/Home_Student"
import Home_Admin from "../AppUsers/Admin/Home_Admin"
import Home_Masterproef from "../AppUsers/Masterproefcoordinator/Home_Masterproef"
import Home_Company from "../AppUsers/Company/Home_Company"
import Home_Promotor from "../AppUsers/Promotor/Home_Promotor"
import Home_Standaard from "../Home_Standaard";

export default function Home(props){
    switch(props.roles) {
        case "STUDENT":
            return <Home_Student persoonid={props.persoonid}/>
        case "ADMIN":
            return <Home_Admin persoonid={props.persoonid}/>
        case "MASTER":
            return <Home_Masterproef persoonid={props.persoonid}/>
        case "COMPANY":
            return <Home_Company persoonid={props.persoonid}/>
        case "PROMOTOR":
            return <Home_Promotor persoonid={props.persoonid}/>
        case "NOTAPPROVED":
            return <Home_Standaard/>
        default:
    }
}