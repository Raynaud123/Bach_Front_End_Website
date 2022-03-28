import React from 'react';
import BedrijfTopic from "./BedrijfTopic";
import StudentTopic from "./StudentTopic"


export default function Topic(props){

    switch(props.roles) {
        case "student":
            return <StudentTopic/>
        case "admin":
            // code block
            break;
        case "masterProef":
            break;
        case "bedrijf":
            return <BedrijfTopic/>
    }
}