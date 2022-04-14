import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BsHeart, BsHeartFill, HiUsers} from "react-icons/all";
import PreferredTopic from "../../topics/PreferredTopic";

export default function TopicChoice_Student(props) {
    const [Preferred, setPreferred] = useState([]);
    const [Show, setShow] = useState(false);
    const studentid = props.persoonid;

    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getPreferred = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid + "/preferred/all" ,
                    signal: controller.signal
                });
                // console.log("Response preferred: " + response.data);
                isMounted && setPreferred(response.data);
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


    function setshow() {
        setShow(!Show);
    }

    function showChoiceTop3() {
        return(
            <div>
                <div>
                    <label htmlFor="cars">1st choice:</label>
                    <select name="cars" id="cars">
                        <option>None</option>
                        {Preferred.map((topic) => (
                            <option>{topic.topicName}</option>
                        ))}
                        {/*<option value="volvo">Volvo</option>*/}

                    </select>
                </div>
                <div>
                    <label htmlFor="cars">2nd choice:</label>
                    <select name="cars" id="cars">
                        <option>None</option>
                        {Preferred.map((topic) => (
                            <option>{topic.topicName}</option>
                        ))}
                        {/*<option value="volvo">Volvo</option>*/}

                    </select>
                </div><div>
                    <label htmlFor="cars">3rd choice:</label>
                    <select name="cars" id="cars">
                        <option>None</option>
                        {Preferred.map((topic) => (
                            <option>{topic.topicName}</option>
                        ))}
                    </select>
                </div>
                <button type={"button"}> Save Choice </button>
            </div>
        )
    }

    return(
        <div>
            <div>
                {
                    Show? showChoiceTop3():<div/>
                }
                <button onClick={() => setshow()} type={"button"}>{
                    Show? <div>Don't show choice</div>:<div>Make choice Top 3 topics</div>
                }
                </button>
            </div>
            <div>
                {Preferred.map((topic) => (
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName}
                                </div>
                                <PreferredTopic className={"buttonheart"} topic_id={topic.topic_id} studentid={studentid}/>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
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
            </div>
        </div>

    )
}