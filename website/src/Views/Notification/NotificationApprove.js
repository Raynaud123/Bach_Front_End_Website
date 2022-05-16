import React, {useEffect, useState} from "react";
import "../../Styles/Notification.css"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";

function getTargetAudience(targetAudience_list) {
    return (
        <div>
            {targetAudience_list? <div>{targetAudience_list.map((ta) => (
                <div key={ta.targetAudience_id} className={"targetAudienceOplijsting"}>
                    <div> {ta.campus.campus_name}</div>
                    <div>{ta.course.abbriviationName}</div>
                </div>
            ))}</div> : "No target audiences"}
        </div>
    )
}
function getCampuss(campus) {
    return (
        <div>
            {campus?
                <div>
                    <div> {campus.campus_name}</div>
                </div> : "No target audiences"}
        </div>
    )
}



export default function NotificationApprove(props){
    const notification_id = props.notification_id;
    const object_name = props.object_name;
    const object_id = props.object_id;
    const notification_msg = props.notification_msg;
    const addedDate = props.addedDate;
    const [Obj, setObj] = useState([]);
    const [Provider, setProvider] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/master/" + object_id,
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setObj(response.data);
                await getProvider(response.data.provider);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getPromotor = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/" + object_id,
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setObj(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getCompany = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topicprovider/" + object_id,
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setObj(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getProvider = async (provid) => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topicprovider/" + provid,
                    signal: controller.signal
                });
                //console.log(response.data);
                isMounted && setProvider(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        if (object_name === "TOPIC"){
            getTopic().then();
        }
        else if (object_name === "PROMOTOR"){
            getPromotor().then();
        }
        else if (object_name === "COMPANY"){
            getCompany().then();
        }
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    function showTopic() {
        return (
            <div className={"NotInfo"}>
                <div className={"TopicName OverflowAuto"}>
                    {Obj.topicName}
                </div>
                <div className={"TopicProviderName OverflowAuto"}>
                    {Provider.name}
                </div>
                <div className={"AddedDate OverflowAuto"}>
                    {addedDate}
                </div>
            </div>
        )
    }
    function showPromotor() {
        return (
            <div className={"NotInfo"}>
                <div className={"TopicName OverflowAuto"}>
                    {Obj.firstName} {Obj.lastName}
                </div>
                <div className={"TopicProviderName OverflowAuto"}>
                    {getTargetAudience(Obj.tartgetAudience)}
                </div>
                <div className={"AddedDate OverflowAuto"}>
                    {addedDate}
                </div>
            </div>
        )
    }
    function showCompany() {
        return (
            <div className={"NotInfo"}>
                <div className={"TopicName OverflowAuto"}>
                    {Obj.name}
                </div>
                <div className={"TopicProviderName OverflowAuto"}>
                    {getCampuss(Obj.campus)}
                </div>
                <div className={"AddedDate OverflowAuto"}>
                    {addedDate}
                </div>
            </div>
        )
    }

    return (
        <div className={"balkNotification"}>
            <div className={"NotInfoBalk"}>
                {object_name === "TOPIC"? showTopic() : <div/>}
                {object_name === "PROMOTOR"? showPromotor() : <div/>}
                {object_name === "COMPANY"? showCompany() : <div/>}
            </div>
            <div className={"NotButtons"}>
                <button><Link to={{ pathname: `/approve/${notification_id}/${object_name}/${object_id}`,}}>
                    Info
                </Link></button>
            </div>
        </div>
    )
}