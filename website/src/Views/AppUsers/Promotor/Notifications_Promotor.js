import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import NotificationInfo_Promotor from "../../Notification/NotificationInfo_Promotor";

export default function Notifications_Promotor(props) {
    const promotorid = props.persoonid;
    const [Promotor, setPromotor] = useState([]);
    const [NotificationList, setNotificationList] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPromotor = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/" + promotorid,
                    signal: controller.signal
                });
                //console.log("Promotor: " + response.data);
                isMounted && setPromotor(response.data);
                if (response.data !== []) setNotificationList(response.data.notification_list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getPromotor().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div>
            Notifications: {Promotor.firstName}
            <div>
                {NotificationList.map((n) => (
                    <NotificationInfo_Promotor notification={n} promotor={Promotor}/>
                ))}
            </div>
        </div>
    )
}
