import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Notifications_Admin(props) {
    const adminid = props.persoonid;
    const [Admin, setAdmin] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getAdmin = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/admin/" + adminid,
                    signal: controller.signal
                });
                //console.log("Admin: " + response.data);
                isMounted && setAdmin(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getAdmin().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div>
            Notifications: {Admin.firstName}
        </div>
    )
}
