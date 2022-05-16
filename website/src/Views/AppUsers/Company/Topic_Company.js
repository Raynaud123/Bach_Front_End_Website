import React, {useEffect, useState} from "react";
import {HiUsers} from "react-icons/all";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

export default function Topic_Company(props){


    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState('');

    const [ApprovedTopic, setApprovedTopic] = useState([]);
    const [NotApprovedTopic, setNotApprovedTopic] = useState([]);

    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();
        const getApprovedTopics = async () => {
            try {
                console.log(props.companyid);
                const response = await axiosPrivate({
                    method: "get",
                    url: `/topic/company/approve/${props.companyid}`,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setApprovedTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }
        const getNotApprovedTopics = async () => {
            try {
                console.log(props.companyid);
                const response = await axiosPrivate({
                    method: "get",
                    url: `/topic/company/notapprove/${props.companyid}`,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setNotApprovedTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }

         getApprovedTopics();
         getNotApprovedTopics()
    },[])



    return(
        <div>
            <h2>Topics who are approved</h2>
            {ApprovedTopic.map((topic) => (
                <div className={"topiccontainer"}>
                    <div key={topic.id} className={"topicbox"}>
                        <div className={"topicmetheart"}>
                            <div className={"topictitleinbox"}>
                                {topic.topicName}
                            </div>
                        </div>
                        <div className={"topicDescriptionbox contentintopicbow"}>
                            {topic.description_topic}
                        </div>
                        <div className={"studentenmetinfo"}>
                            <div className={"topicAantalStudentenbox contentintopicbow"}>
                                <HiUsers className={"persoonicoontopic"}/>
                                <p>number of students: {topic.aantal_studenten}</p>
                            </div>
                            <button className={"info_topic_button"}>
                                <Link to={{
                                    pathname: `/topics/info/${topic.topic_id}`,
                                }}
                                >Info</Link></button>
                        </div>
                    </div>
                </div>
            ))}
            <h2>Topics who are not approved</h2>
            {NotApprovedTopic.map((topic) => (
                <div className={"topiccontainer"}>
                    <div key={topic.id} className={"topicbox"}>
                        <div className={"topicmetheart"}>
                            <div className={"topictitleinbox"}>
                                {topic.topicName}
                            </div>
                        </div>
                        <div className={"topicDescriptionbox contentintopicbow"}>
                            {topic.description_topic}
                        </div>
                        <div className={"studentenmetinfo"}>
                            <div className={"topicAantalStudentenbox contentintopicbow"}>
                                <HiUsers className={"persoonicoontopic"}/>
                                <p>number of students: {topic.aantal_studenten}</p>
                            </div>
                            <button className={"info_topic_button"}>
                                <Link to={{
                                    pathname: `/topics/info/${topic.topic_id}`,
                                }}
                                >Info</Link></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}