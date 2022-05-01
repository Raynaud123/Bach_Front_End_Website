import React, {useState, useEffect} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {HiUsers} from "react-icons/all";
import {useNavigate, useLocation} from "react-router-dom";
import PreferredTopic from "./PreferredTopic"
import {Link} from "react-router-dom";


export default function ApprovedTopics(props){
    const studentid = props.studentid;
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const [Topic, setTopic] = useState([]);
    const [Promotors, setPromotors] = useState([]);


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
                isMounted && setPromotors(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }

        }
        getApprovedTopic().then();
        getPromotor().then();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    //Topic.map(topic => console.log( topic ));

    function getPromotorName(promotor_id) {
        for(let i = 0; i<Promotors.length; i++){
            if (Promotors[i].id === promotor_id) return Promotors[i].firstName + " " + Promotors[i].lastName;
        }
        return "No promotors";
    }
    function getTargetAudience(targetAudience_list) {
        return (
            <div>
            {targetAudience_list? <div>{targetAudience_list.map((ta) => (
                <div key={ta.targetAudience_id} className={"targetAudienceOplijsting"}>
                    <div> {ta.campus.campus_name}</div>
                    <div>{ta.course.abbriviationName}</div>
                </div>
                 ))}</div> : "No target audiences"}
            </div>
        )
    }
    function getKeywords(keyword_list) {
        return (
            <div>
                {keyword_list && keyword_list.length>1?
                    <div>{keyword_list.map((k,index) => (
                    index===0? k.keyword_name: ", " + k.keyword_name
                ))}</div> : "No keywords"}
            </div>
        )
    }

    return(
            <div>
                {Topic.map((topic) => (
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName? topic.topicName: "No topic name"}
                                </div>
                                <PreferredTopic className={"buttonheart"} topic_id={topic.topic_id} studentid={studentid}/>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic? topic.description_topic: "No description"}
                            </div>
                            <div className={"topicPromotorbox contentintopicbow"} >
                                {getPromotorName(topic.promotor)}
                            </div>
                            <div className={"targetAudiencebox contentintopicbow"} >
                                {getTargetAudience(topic.targetAudience_list)}
                            </div>
                            <div className={"keywordbox contentintopicbow"} >
                                {getKeywords(topic.keyword_list)}
                            </div>
                            <div className={"studentenmetinfo"}>
                                <div className={"topicAantalStudentenbox contentintopicbow"}>
                                    <HiUsers className={"persoonicoontopic"}/>
                                    Number of students: {topic.aantal_studenten}
                                </div>
                                <button className={"info_topic_button"}>
                                <Link to={{
                                    pathname: `/topics/info/${topic.topic_id}`,
                                }}
                                >Info</Link></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)
}
