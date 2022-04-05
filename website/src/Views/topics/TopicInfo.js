import React, {useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

export default function TopicInfo(props){
    // const location = useLocation()
    // const topicid = location.state;
    const topicid = 1; //props.topicid;
    const [Topic, setTopic] = useState(false);
    let tpath = 'http://localhost:8080/topic/info/' + topicid;
    axios.get(tpath).then(res => {
        console.log(res);
        setTopic(res.data)
    });


    return(
        <div>
            <a>
                {Topic.topicName}
            </a>
        </div>
    )
}