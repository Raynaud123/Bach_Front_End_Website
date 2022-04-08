import React, {useState, useEffect} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {HiUsers} from "react-icons/all";
import {useNavigate, useLocation} from "react-router-dom";
import PreferredTopic from "./PreferredTopic"
import {Link} from "react-router-dom";


export default function ApprovedTopics(){

    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();

    const navigate = useNavigate();

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
                isMounted && setData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log("tyfus " + errMsg);
            }
        }

        getApprovedTopic();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    data.map(topic => console.log(
        topic
    ));

        return(
            <div>
                {data.map((topic) => (
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName}
                                </div>
                                <PreferredTopic className={"buttonheart"} gevuld={false}/>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"topicAantalStudentenbox contentintopicbow"}>
                                <HiUsers className={"persoonicoontopic"}/>
                                aantal studenten: {topic.aantal_studenten}
                                <div className={"topicPromotorbox contentintopicbow"}>
                                    {/*{topic.promotor_id}*/}
                                    {/*{this.findNameProm(topic.promotor_id)}*/}
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
                    </div>
                ))}
            </div>)
}
