import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function TopicInfo() {
    const [Topic, setTopic] = useState(false);
    const [Provider, setProvider] = useState(false);

    const top = useParams();
    let tpath = 'http://localhost:8080/';

    useEffect(async () => {
        if (!Topic) {
            axios.get(tpath + 'topic/info/' + top.t).then(res => {
                console.log(res);
                setTopic(res.data);
            }, [])
        }
        if (!Provider && Topic) {
            axios.get('http://localhost:8080/topicprovider/' + Topic.provider_id).then(res => {
                console.log(res);
                setProvider(res.data[0]);
            }, [])
        }
    });

    return(
        <div className={"showTopics"}>
            <h1 className={"topicTitle title"}>{Topic.topicName}</h1>
            <h4 className={"sectie title"}>Information Topic</h4>
            {Provider.name}
        </div>
    )
}