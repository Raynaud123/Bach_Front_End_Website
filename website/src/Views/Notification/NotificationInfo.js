import React from 'react';
import NotificationInfoPerObjSort_MasterProef from "./NotificationInfoPerObjSort_MasterProef";


export default function NotificationInfo(props){
    switch(props.roles) {
        case "MASTER":
            return <NotificationInfoPerObjSort_MasterProef persoonid={props.persoonid}/>
    }
}