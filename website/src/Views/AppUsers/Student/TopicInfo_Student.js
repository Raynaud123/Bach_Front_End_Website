import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export default function TopicInfo_Student() {

    const axiosPrivate = useAxiosPrivate();
    const [Topic, setTopic] = useState([]);
    const [Provider, setProvider] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const top = useParams();

    useEffect(async () => {
        let isMounted = true;
        //cancel request if component is unmountend
        const controller = new AbortController();

        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/info/" + top.t,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
                getProvider(response.data.provider_id);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }
        const getProvider = async (provid) => {
            // console.log(provid);
            if (provid !== "undefined") {
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/topicprovider/" + provid,
                        signal: controller.signal
                    });
                    console.log(response.data[0]);
                    isMounted && setProvider(response.data[0]);
                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
        }
        getTopic();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div className={"showTopics"}>
            <h1 className={"topicTitle title"}>{Topic.topicName}</h1>
            <h4 className={"sectie title"}>Information Topic</h4>
            {Provider.name}
        </div>
    )
}