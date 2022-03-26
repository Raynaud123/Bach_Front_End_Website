import React from 'react';
import BedrijfTopic from "./BedrijfTopic";


export default function Topic(props){

    switch(props.roles) {
        case "student":
            // code block
            break;
        case "admin":
            // code block
            break;
        case "masterProef":
            break;
        case "bedrijf":
            return <BedrijfTopic/>
            break;
    }


}