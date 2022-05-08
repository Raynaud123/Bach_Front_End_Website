import React from 'react';
import TopicInfo_Student from "../AppUsers/Student/TopicInfo_Student";
import TopicInfo_Admin from "../AppUsers/Admin/TopicInfo_Admin";
import NotificationInfoTopic_Masterproef from "../Notification/NotificationInfoTopic_Masterproef";
import TopicInfo_Company from "../AppUsers/Company/TopicInfo_Company";
import TopicInfo_Promotor from "../AppUsers/Promotor/TopicInfo_Promotor";
import {useParams} from "react-router-dom";


export default function NotificationInfo(props){
    const obj_name = useParams().object_name;
    switch(obj_name) {
        case "TOPIC":
            return <NotificationInfoTopic_Masterproef persoonid={props.persoonid} topicid={useParams().object_id}/>
    }
}