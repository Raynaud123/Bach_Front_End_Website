import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/personalInfo.css"
import Logout from "../../Login/Logout";

export default function PersonalInfo_Promotor(props) {
    const promotorid = props.promotorid;
    const [Promotor, setPromotor] = useState([]);

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
            <h2>Personal Information</h2>
            <p><span>Firstname: </span>{Promotor.firstName}</p>
            <p><span>Lastname: </span> {Promotor.lastName}</p>
            <p><span>Role: </span> {`${Promotor.appUserRole}`.toLowerCase()}</p>
        </div>
    )
}
