import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Notifications_Company(props) {
    const companyid = props.persoonid;
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
                    url: "/topicprovider/approved/" + companyid,
                    signal: controller.signal
                });
                //console.log("Company: " + response.data);
                isMounted && setCompany(response.data);
            } catch (err) {
                if(err.response.status == 401){
                    navigate('/unauthorized',{replace:true});
                    console.log(err);
                }
                else {
                    console.log(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
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
            Notifications: {Company.name}
        </div>
    )
}
