import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function TopicInfo_Student() {

    const top = useParams();
    const [Topic, setTopic] = useState([]);
    const [Provider, setProvider] = useState([]);
    const [Promotor, setPromotor] = useState([]);
    const [TargetAudience, setTargetAudience] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

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
                getPromotor(response.data.promotor_id);
                getTargetAudience(response.data.targetAudience_list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
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
                    // console.log(response.data[0]);
                    isMounted && setProvider(response.data[0]);
                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
        }
        const getPromotor = async (promid) => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/" + promid,
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setPromotor(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        const getTargetAudience = async (targetAudienceList) => {
            console.log(targetAudienceList);
            try {
                setTargetAudience(targetAudienceList);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
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
            <div>
                <h3 className={"sectie title"}>Topic Information</h3>
                <div>Description: {Topic.description_topic}</div>
                <br/>
                Promotor: {Promotor? <div>{Promotor.firstName} {Promotor.lastName}</div> : <div>None</div>}
                <br/>
                TargetAudience: {TargetAudience.map((target) => (
                    <div> &emsp; {target.campus.campus_name} - {target.course.course_name}</div>
                ))}

            </div>
            <div>
                <h3 className={"sectie title"}>Contact</h3>
                {Provider.name}
            </div>

        </div>
    )
}