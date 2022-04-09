import React, {useState, useEffect} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {HiUsers} from "react-icons/all";
import {useNavigate, useLocation} from "react-router-dom";
import PreferredTopic from "./PreferredTopic"
import {Link} from "react-router-dom";


export default function ApprovedTopics(){

    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const [Topic, setTopic] = useState([]);
    const [Promotor, setPromotor] = useState([]);


    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();

        const getApprovedTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/topic/approved",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getPromotor = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/withtopic",
                    signal: controller.signal
                });
                // console.log(response.data);
                isMounted && setPromotor(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        getApprovedTopic();
        getPromotor();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    // Topic.map(topic => console.log( topic ));

    function getPromotorName(promotor_id) {
        for(let i = 0; i<Promotor.length; i++){
            if (Promotor[i].id === promotor_id) return Promotor[i].firstName + " " + Promotor[i].lastName;
        }
    }

    return(
            <div>
                {Topic.map((topic) => (
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName}
                                </div>
                                <PreferredTopic className={"buttonheart"} topicname={topic.topicName} />
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"topicPromotorbox contentintopicbow"} >
                                {getPromotorName(topic.promotor_id)}
                            </div>
                            <div className={"studentenmetinfo"}>
                                <div className={"topicAantalStudentenbox contentintopicbow"}>
                                    <HiUsers className={"persoonicoontopic"}/>
                                    aantal studenten: {topic.aantal_studenten}
                                </div>
                                <button className={"info_topic_button"}>
                                <Link to={{
                                    pathname: `/topics/info/${topic.topicName}`,
                                }}
                                >Info</Link></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)
}
