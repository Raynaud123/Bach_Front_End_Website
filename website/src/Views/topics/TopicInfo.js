import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";

export default function TopicInfo() {
    const [Topic, setTopic] = useState(false);
    const t = useParams();
    let tpath = 'http://localhost:8080/topic/info/' + t.t;

    useEffect(async () => {
        if (!Topic) {
            axios.get(tpath).then(res => {
                console.log(res);
                setTopic(res.data)
            }, [])
        }
    });

    return(
        <div>
            <a>
                {Topic.topicName}
                {Topic.aantal_studenten}
            </a>
        </div>
    )

}