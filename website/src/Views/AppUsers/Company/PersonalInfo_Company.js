import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function PersonalInfo_Company(props) {
    const companyid = props.companyid;
    const [Company, setCompany] = useState([]);
    const [Role, setRole] = useState('')

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
                console.log(response.data);
                isMounted && setCompany(response.data);
                if(response.data.company === true){
                    setRole("Company")
                }else {
                    setRole("Research")
                }
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
            <h2>Company Details</h2>
            <p><span>Name: </span>{Company.name}</p>
            <p><span>Role: </span>{Role}</p>
        </div>
    )
}
