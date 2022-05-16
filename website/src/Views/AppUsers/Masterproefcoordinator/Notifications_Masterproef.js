import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Home.css";
import NotificationInfoPerObjSort_MasterProef from "../../Notification/NotificationInfoPerObjSort_MasterProef";


export default function Notifications_Master(props) {
    const masterid = props.persoonid;
    const [Master, setMaster] = useState([]);

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
                    url: "/master/" + masterid,
                    signal: controller.signal
                });
                //console.log("Master: " + response.data);
                isMounted && setMaster(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getMaster().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div className={"standaard"}>
            Notifications: {Master.firstName}
            <div>
                If there are topics/promotor/companies/researchgroups that need to be approved, you will find them in the path "approve".
            </div>
        </div>
    )
}
