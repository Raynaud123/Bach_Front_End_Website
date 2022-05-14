import React from 'react';
import NotificationInfoPerObjSort_MasterProef from "./NotificationInfoPerObjSort_MasterProef";
import NotificationInfo_Company from "./NotificationInfo_Company";


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