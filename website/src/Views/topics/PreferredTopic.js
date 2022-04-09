import React, {useEffect, useState} from "react";
import {BsHeartFill, BsHeart} from "react-icons/all";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";


export default function PreferredTopic (props){
    const [filled, setFilled] = useState(false);
    const topicname = props.topicname;


    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPreferred = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + 1 + "/preferred/" + topicname,                     // hier nog id van student -> "/student/{id}/preferred"
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setFilled(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getPreferred();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <button className={"buttonheart"} onClick={() => setFilled(!filled)} type={"button"}>{
            filled? <BsHeartFill className={"hearticoonfill"}/>:
                    <BsHeart className={"hearticoon"}/>
        }
        </button>
    )
}