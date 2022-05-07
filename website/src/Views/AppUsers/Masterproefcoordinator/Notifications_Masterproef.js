import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

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
        <div>
            Notifications: {Master.firstName}
        </div>
    )
}
