import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

export default function ViewChoice_Student(props) {
    const studentid = props.persoonid;
    const [Top3, setTop3] = useState([]);

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTop3Student = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid + "/top3",
                    signal: controller.signal
                });
                console.log("Top3: " + response.data);
                isMounted && setTop3(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        getTop3Student().then();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    Top3.map(topic => console.log( topic ));

    function showNoTop3() {
        return (
            <div>
                No Top 3 chosen
            </div>
        );
    }

    function showChoice(topic, choice) {
        return (
            <div key={topic.topic_id}>
                <div>
                    {choice}: {topic.topicName}
                </div>
                {/*<div>*/}
                {/*    &emsp;{topic.promotor.name}*/}
                {/*</div>*/}
            </div>
        );
    }

    return(
        <div>
            {Top3.length!==0? Top3.map((topic,index) => (
                <div key={topic.topic_id}>
                    {index===0? showChoice(topic, "First Choice"):
                      index===1? showChoice(topic, "Second Choice"):
                        index===2? showChoice(topic, "Third Choice"): "No Top 3 chosen"}
                </div>
            )): showNoTop3()}
        </div>
    )
}
