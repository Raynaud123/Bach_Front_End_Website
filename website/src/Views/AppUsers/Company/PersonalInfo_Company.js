import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonalInfo_Company(props) {
    const companyid = props.companyid;
    const [Company, setCompany] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getCompany = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topicprovider/" + companyid,
                    signal: controller.signal
                });
                //console.log("Company: " + response.data);
                isMounted && setCompany(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getCompany().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return(
        <div>
            {Company.name}
        </div>
    )
}
