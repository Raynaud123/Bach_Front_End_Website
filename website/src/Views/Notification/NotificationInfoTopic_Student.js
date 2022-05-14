import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {BsCheck, BsXCircle} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function NotificationInfo_Student(props) {

    const topic = props.topic;

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    return(
        <div className={"showTopicInfo"}>
            <div className={"topicinfocontainer"}>
                {
                    topic? topic.topicName: "Something went wrong..."
                }

            </div>
        </div>
    )
}

