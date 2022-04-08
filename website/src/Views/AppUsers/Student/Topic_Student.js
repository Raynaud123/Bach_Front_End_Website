import React, {useEffect, useState} from "react";
import ApprovedTopics from "../../topics/ApprovedTopics";
import TopicFilter from "../../topics/TopicFilter"
import '../../../Styles/Topics.css';
import axios from "axios";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

const phase = axios.create({
    baseURL: `http://localhost:8080/phase/now`
})

export default function Topic_Student (){

    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();

        const getPhase = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/phase/now",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }
        getPhase();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


        return (
             <div className={"showTopics"}>
                <div className={"titel"}>
                   <h1 className={"topicTitle titel"}>Masterthesis Topics</h1>
                     <h4 className={"ronde titel"}><b>First Round</b> &emsp;&emsp; {data.phase_name} ({data.begin_deadline} - {data.end_deadline})</h4>
               </div>
                <TopicFilter/>
                <ApprovedTopics/>
            </div>
        )
}