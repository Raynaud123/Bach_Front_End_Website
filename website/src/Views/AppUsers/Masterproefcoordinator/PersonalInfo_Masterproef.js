import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import "../../../Styles/personalInfo.css"
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonalInfo_Master(props) {
    const masterid = props.masterid;
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

    async function askAdmin() {
        try {
            await axiosPrivate({
                method: "post",
                url: "http://localhost:8080/admin/help/" + masterid,
            });
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <h2>Personal Information</h2>
            <p><span>Firstname: </span>{Master.firstName}</p>
            <p><span>Lastname: </span> {Master.lastName}</p>
            <p><span>Role: </span> {`${Master.appUserRole}`.toLowerCase()}</p>
            <div onClick={() => askAdmin()}>Ask help from Admin</div>
        </div>
    )
}
