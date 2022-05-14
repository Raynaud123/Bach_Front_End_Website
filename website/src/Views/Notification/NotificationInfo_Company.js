import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";


export default function NotificationInfo_Company(props) {
    const company = props.company;
    const notification = props.notification;
    const [Topic, setTopic] = useState([]);

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
                    url: "/topic/" + notification.object_id,
                    signal: controller.signal
                });
                console.log("Topic: " + response.data);
                isMounted && setTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        if (notification.object_name==="TOPIC"){
            getTopic().then();
        }
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div className={"showTopicInfo"}>
            <div className={"topicinfocontainer"}>
                {notification.object_name==="COMPANY"?
                    <div>
                        {notification.notification_msg==="APPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>You are approved :) !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                        {notification.notification_msg==="NOTAPPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>You are not approved :( !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                    </div>:<div/>
                }

                {notification.object_name==="TOPIC"?
                    <div>
                        {notification.notification_msg==="APPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>Your Thesis Topic is approved :) !</h2>
                                <div>
                                    {Topic.topicName}
                                </div>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                        {notification.notification_msg==="NOTAPPROVED"?
                            <div className={"topicmetButtons"}>
                                <h2 className={"OverflowAuto"}>Your Thesis Topic is not approved :( !</h2>
                                <div>
                                    {notification.addedDate}
                                </div>
                            </div>
                            :""}
                    </div>:<div/>
                }
            </div>
        </div>
    )
}

