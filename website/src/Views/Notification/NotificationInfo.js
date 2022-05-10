import React from 'react';
import TopicInfo_Student from "../AppUsers/Student/TopicInfo_Student";
import TopicInfo_Admin from "../AppUsers/Admin/TopicInfo_Admin";
import NotificationInfoPerObjSort_MasterProef from "./NotificationInfoPerObjSort_MasterProef";
import TopicInfo_Company from "../AppUsers/Company/TopicInfo_Company";
import TopicInfo_Promotor from "../AppUsers/Promotor/TopicInfo_Promotor";


export default function NotificationInfo(props){
    switch(props.roles) {
        // case "STUDENT":
        //     return <NotificationInfo_Student persoonid={props.persoonid}/>
        // case "ADMIN":
        //     return <NotificationInfo_Admin persoonid={props.persoonid}/>
        case "MASTER":
            return <NotificationInfoPerObjSort_MasterProef persoonid={props.persoonid}/>
        // case "COMPANY":
        //     return <NotificationInfo_Company persoonid={props.persoonid}/>
        // case "PROMOTOR":
        //     return <NotificationInfo_Promotor persoonid={props.persoonid}/>
    }
}