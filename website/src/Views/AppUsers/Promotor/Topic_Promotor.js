import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HiUsers} from "react-icons/all";

export default function Topic_Promotor(props){

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState('');

    const [Topic, setTopic] = useState([]);
    const [Promotor, setPromotor] = useState([]);

    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();
        const getTopics = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: `/topic/promotor/${props.id}`,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }


        const getPromotor = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: `/promotor/${props.id}`,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPromotor(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }

        getTopics();
        getPromotor();


        return () => {
            isMounted = false;
            controller.abort();
        }}, [])



    return(
        <div >
            <h1>Test</h1>
            {Topic.map((topic) => (
                <div className={"topiccontainer"}>
                    <div key={topic.id} className={"topicbox"}>
                        <div className={"topicmetheart"}>
                            <div className={"topictitleinbox"}>
                                {topic.topicName}
                            </div>
                        </div>
                        <div className={"topicDescriptionbox contentintopicbow"}>
                            {topic.description_topic}
                        </div>
                        <div className={"topicPromotorbox contentintopicbow"} >
                            {Promotor.username}
                        </div>
                        <div className={"studentenmetinfo"}>
                            <div className={"topicAantalStudentenbox contentintopicbow"}>
                                <HiUsers className={"persoonicoontopic"}/>
                                <p>number of students: {topic.aantal_studenten}</p>
                            </div>
                            {/*<button className={"info_topic_button"}>*/}
                            {/*    <Link to={{*/}
                            {/*        pathname: `/topics/info/${topic.topicName}`,*/}
                            {/*    }}*/}
                            {/*    >Info</Link></button>*/}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}