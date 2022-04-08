import React from 'react';
import TopicInfo_Student from "../Student/TopicInfo_Student";
import TopicInfo_Admin from "../Admin/TopicInfo_Admin";
import TopicInfo_Masterproef from "../Masterproefcoordinator/TopicInfo_Masterproef";
import TopicInfo_Company from "../Company/TopicInfo_Company";
import TopicInfo_Promotor from "../Promotor/TopicInfo_Promotor";


export default function TopicInfo(props){

    switch(props.roles) {
        case "student":
            return <TopicInfo_Student/>
        case "admin":
            return <TopicInfo_Admin/>
        case "masterProef":
            return <TopicInfo_Masterproef/>
        case "company":
            return <TopicInfo_Company/>
        case "promotor":
            return <TopicInfo_Promotor/>
    }
}