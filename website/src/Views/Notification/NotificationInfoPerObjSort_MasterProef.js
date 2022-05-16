import React from 'react';
import NotificationInfoTopic_Masterproef from "../Notification/NotificationInfoTopic_Masterproef";
import NotificationInfoPromotor_Masterproef from "../Notification/NotificationInfoPromotor_Masterproef";
import NotificationInfoCompany_Masterproef from "../Notification/NotificationInfoCompany_Masterproef";
import {useParams} from "react-router-dom";


export default function NotificationInfo(props){
    const obj_name = useParams().object_name;
    switch(obj_name) {
        case "TOPIC":
            return <NotificationInfoTopic_Masterproef persoonid={props.persoonid} topicid={useParams().object_id}/>
        case "PROMOTOR":
            return <NotificationInfoPromotor_Masterproef persoonid={props.persoonid} promotorid={useParams().object_id}/>
        case "COMPANY":
            return <NotificationInfoCompany_Masterproef persoonid={props.persoonid} companyid={useParams().object_id}/>
        default:
    }
}