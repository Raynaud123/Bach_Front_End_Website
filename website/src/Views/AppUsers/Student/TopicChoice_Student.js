import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {HiUsers} from "react-icons/all";
import PreferredTopic from "../../topics/PreferredTopic";
import Top3Pick_Student from "../Student/Top3Pick_Student";

export default function TopicChoice_Student(props) {
    const studentid = props.persoonid;
    const [Preferred, setPreferred] = useState([]);
    const [Top3, setTop3] = useState([]);
    const [Show, setShow] = useState(false);


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
                console.log("Response preferred: " + response.data);
                isMounted && setPreferred(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg + " fout bij preferred");
            }
        }
        const getTop3 = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/student/" + studentid + "/top3" ,
                    signal: controller.signal
                });
                //console.log("Response top3: " + response.data);
                isMounted && setTop3(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg + " fout bij top3: " + studentid + " top3: " + Top3);
            }
        }
        getPreferred();
        getTop3();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function setshow() {
        setShow(!Show);
    }

    function top3possible() {
        console.log(Preferred);
        return (
            <div>
                {
                    Show?
                        <Top3Pick_Student
                        studentid={studentid}
                        preferred={Preferred}
                        />
                    :<div/>
                }
                <button onClick={() => setshow()} type={"button"}>{
                    Show && Top3.length===0? <div>Don't show choice</div>:<div>Make choice Top 3 topics</div>
                }
                </button>
            </div>
        )
    }

    return(
        <div>
            <div>
                {/*{*/}
                {/*    Top3.length === 0? top3possible():<div>Already made top 3 choice</div>*/}
                {/*}*/}
            </div>
            <div>
            {/*    {Preferred.map((topic) => (*/}
            {/*        <div className={"topiccontainer"}>*/}
            {/*            <div key = {topic.id} className={"topicbox"}>*/}
            {/*                <div className={"topicmetheart"}>*/}
            {/*                    <div className={"topictitleinbox"}>*/}
            {/*                        {topic.topicName}*/}
            {/*                    </div>*/}
            {/*                    <PreferredTopic className={"buttonheart"} topic_id={topic.topic_id} studentid={studentid}/>*/}
            {/*                </div>*/}
            {/*                <div className={"topicDescriptionbox contentintopicbow"}>*/}
            {/*                    {topic.description_topic}*/}
            {/*                </div>*/}
            {/*                <div className={"studentenmetinfo"}>*/}
            {/*                    <div className={"topicAantalStudentenbox contentintopicbow"}>*/}
            {/*                        <HiUsers className={"persoonicoontopic"}/>*/}
            {/*                        Number of students: {topic.aantal_studenten}*/}
            {/*                    </div>*/}
            {/*                    <button className={"info_topic_button"}>*/}
            {/*                        <Link to={{*/}
            {/*                            pathname: `/topics/info/${topic.topic_id}`,*/}
            {/*                        }}*/}
            {/*                        >Info</Link></button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            </div>
        </div>
    )
}