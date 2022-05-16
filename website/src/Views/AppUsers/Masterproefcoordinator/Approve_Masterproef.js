import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import NotificationApprove from "../../Notification/NotificationApprove"

export default function Approve_Masterproef(props){
    const masterid = props.persoonid;
    const [MasterNotifications, setMasterNotifications] = useState([]);
    const [Phase, setPhase] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getMaster = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/master/" + masterid + "/notifications",
                    signal: controller.signal
                });
                //console.log(response.data);
                const myData = [].concat(response.data).sort((a, b) => a.notification_id > b.notification_id ? 1 : -1);
                isMounted && setMasterNotifications(myData);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getPhase = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/phase/now",
                    signal: controller.signal
                });
                isMounted && setPhase(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getMaster().then();
        getPhase().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div className={"showNot"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}>Approve Topics/Promotors/ResearchGroups/Companies</h1>
                <h4 className={"ronde titel"}> &emsp; Approving is possible until: {Phase.begin_deadline} - {Phase.end_deadline}</h4>
            </div>
            
            {
                MasterNotifications.map((not) => (
                    <div key={not.notification_id}>
                        {not.notification_msg === "AWAITAPPROVED"?
                        <NotificationApprove
                            notification_msg={not.notification_msg}
                            object_name={not.object_name}
                            object_id={not.object_id}
                            notification_id={not.notification_id}
                            addedDate={not.addedDate}
                        />: ""}
                    </div>
                ))
            }
        </div>
    )
}