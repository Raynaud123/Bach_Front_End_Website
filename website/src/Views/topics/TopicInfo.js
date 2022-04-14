import React from 'react';
import TopicInfo_Student from "../AppUsers/Student/TopicInfo_Student";
import TopicInfo_Admin from "../AppUsers/Admin/TopicInfo_Admin";
import TopicInfo_Masterproef from "../AppUsers/Masterproefcoordinator/TopicInfo_Masterproef";
import TopicInfo_Company from "../AppUsers/Company/TopicInfo_Company";
import TopicInfo_Promotor from "../AppUsers/Promotor/TopicInfo_Promotor";


export default function TopicInfo(props){
    switch(props.roles) {
        case "STUDENT":
            return <TopicInfo_Student studentid={props.persoonid}/>
        case "ADMIN":
            return <TopicInfo_Admin adminid={props.persoonid}/>
        case "MASTER":
            return <TopicInfo_Masterproef masterid={props.persoonid}/>
        case "COMPANY":
            return <TopicInfo_Company companyid={props.persoonid}/>
        case "PROMOTOR":
            return <TopicInfo_Promotor promotorid={props.persoonid}/>
    }
}