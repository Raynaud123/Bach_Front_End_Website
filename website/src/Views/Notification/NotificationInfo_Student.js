import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {BsCheck, BsXCircle} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import NotificationInfoTopic_Student from "../Notification/NotificationInfoTopic_Student"


export default function NotificationInfo_Student(props) {

    const student = props.student;
    console.log(student);
    const notification = props.notification;

    const [Show, setShow] = useState(false);
    const [Topic, setTopic] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAssignedTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/assigned/" + student.id,
                    signal: controller.signal
                });
                console.log("Response assigned topic: " + response.data);
                isMounted && setTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getAssignedTopic();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])




    return(
        <div className={"showTopicInfo"}>
            <div className={"topicinfocontainer"}>
                <div>{notification.notification_msg==="ASSIGNED"?
                    <div className={"topicmetButtons"}>
                        <h2 className={"OverflowAuto"}>You are assigned to a Thesis Topic!</h2>
                        <div>
                            {notification.addedDate}
                        </div>
                        <div>
                            <button onClick={() => setShow(!Show)}>
                                Info
                            </button>
                        </div>
                    </div>
                    :""}
                {Show?
                    <NotificationInfoTopic_Student topic={Topic}/>:<div/>}
                </div>
            </div>
        </div>
    )
}

