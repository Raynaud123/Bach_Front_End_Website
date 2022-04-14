import React, {useEffect, useState} from "react";
import ApprovedTopics from "../../topics/ApprovedTopics";
import TopicFilter from "../../topics/TopicFilter"
import '../../../Styles/Topics.css';
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function Topic_Student (props){
    const studentid = props.studentid;
    const [phase, setPhase] = useState([]);
    const [firstRound, setFirstRound] = useState(true);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
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
                // console.log(response.data);
                isMounted && setPhase(response.data);
                setFirstRound(response.data.firstRound);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
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
                <h4 className={"ronde titel"}> { firstRound? <b>First Round</b> : <b>Second Round</b>}
                    &emsp;&emsp; {phase.phase_name} ({phase.begin_deadline} - {phase.end_deadline})</h4>
           </div>
            <TopicFilter/>
            <ApprovedTopics studentid={studentid}/>
        </div>
    )
}