import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import PreferredTopic from "../../topics/PreferredTopic";
import TopicsPromotor  from "../../../Styles/TopicsPromotor.css";


export default function TopicInfo_Promotor(props) {

    const promotorid = props.promotorid;
    const topicid = useParams().topicid;
    const [Topic, setTopic] = useState([]);
    const [Provider, setProvider] = useState([]);
    const [Promotor, setPromotor] = useState([]);
    const [TargetAudience, setTargetAudience] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Keyword, setKeyword] = useState([]);
    const [SelectStudent, setSelectStudent] = useState();
    const [BoostedStudent, setBoostedStudent] = useState([]);


    const axiosPrivate = useAxiosPrivate();
    const [errMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    let from = `/topics/info/${topicid}`;

    useEffect(async () => {
        let isMounted = true;
        const controller = new AbortController();




        const getTopic = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: `/topic/${topicid}`,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setTopic(response.data);
                await getProvider(response.data.provider);
                await getTargetAudience(response.data.targetAudience_list);
                await getKeywords(response.data.keyword_list);
                await getPromotor(response.data.promotor);
                await getStudents();
                if(response.data.boostedStudent !== "undefined"){
                    setBoostedStudent(response.data.boostedStudent);
                }
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getProvider = async (provid) => {
            if (provid !== "undefined") {
                try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: "/topicprovider/" + provid,
                        signal: controller.signal
                    });
                    isMounted && setProvider(response.data);
                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
            }
        }

        const getTargetAudience = async (targetAudienceList) => {
            try {
                setTargetAudience(targetAudienceList);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getKeywords = async (keywords) => {
            try {
                setKeyword(keywords);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getPromotor = async () => {
            try {
                if(promotorid !== "undefined"){
                    const response = await axiosPrivate({
                        method: "get",
                        url: `/promotor/` + promotorid,
                        signal: controller.signal
                    });
                    console.log(response);
                    setPromotor(response.data);
                }
                else{
                    setPromotor(null)
                }
            }catch (err){
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }
        const getStudents = async () => {
            try {
                    const response = await axiosPrivate({
                        method: "get",
                        url: `/student/all`,
                        signal: controller.signal
                    });
                    console.log(response);
                    setStudents(response.data);
            }catch (err){
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }

        }

        await getTopic();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

/*    useEffect(

        async () =>{
            const handleBoost = async () => {
                try {
                    const response = await axiosPrivate({
                        method: "PUT",
                        url: `/topic/boost/${topicid}`,
                        data: JSON.stringify({'studentid': SelectStudent})
                    });
                    console.log(response.data);
                    navigate(`/topics/info/${topicid}`, {replace: true});
                } catch (err) {
                    console.error(err);
                    navigate('/login', {state: {from: location}, replace: true});
                    console.log(errMsg);
                }
        }
        await handleBoost();

    },[submit])*/


    const handleOnclick = async (e) => {
        e.preventDefault();
        console.log(SelectStudent);
        const handleBoost = async () => {
            try {
                const response = await axiosPrivate({
                    method: "PUT",
                    url: `/topic/boost/${topicid}`,
                    data: JSON.stringify({'studentId': SelectStudent})
                });
                setBoostedStudent(SelectStudent);
                console.log(response.data);
                navigate(`/topics/info/${topicid}`, {replace: true});
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log(errMsg);
            }
        }
        await handleBoost();
    }




    function PromInfo() {
        return(
            <div>
                <h3>Promotor</h3> {Promotor.firstName} {Promotor.lastName}
                <div>
                    &emsp;  Email: {Promotor.email? <div>&emsp;&emsp;{Promotor.email}</div> : "None" }
                </div>
                <div>
                    &emsp;  Phone number: {Promotor.phoneNumber? <div>&emsp;&emsp;{Promotor.phoneNumber}</div> : "None" }
                </div>
                <div>
                    &emsp;  Address: {(Promotor.country && Promotor.city && Promotor.streetName)? <div>&emsp;&emsp;{Promotor.streetName} {Promotor.streetNumber}<br/>&emsp;&emsp;{Promotor.country} {Promotor.city} {Promotor.postNumber}</div> : "None"}
                </div>
            </div>
        )}
    function ProvInfo() {
        return(
            <div>
                <div>
                    <h3>{Provider.name}</h3>
                    <div>
                        &emsp;  Email: {Provider.email? <div>&emsp;&emsp;{Provider.email}</div> : "None" }
                    </div>
                    <div>
                        &emsp;  Phone number: {Provider.phoneNumber? <div>&emsp;&emsp;{Provider.phoneNumber}</div> : "None" }
                    </div>
                    <div>
                        &emsp;  Address: {(Provider.country && Provider.city && Provider.streetName)? <div>&emsp;&emsp;{Provider.streetName} {Provider.streetNumber} <br/>&emsp;&emsp;{Provider.country} {Provider.city} {Provider.postNumber}</div> : "None"}
                    </div>
                </div>
                <div>
                    {Promotor ? PromInfo(): "No Promotor"}
                </div>

            </div>
        )
    }
    function KeywordInfo() {
        return(
            <div className={"tekst"}>
                <h3>Keywords:</h3> {Keyword? <div>{Keyword.map((keyword) => (<div> &emsp; {keyword.keyword_name}</div> ))}</div> : "None"}
            </div>
        )}

    return(
        <div className={"showTopicInfo"}>
            <h1 className={"topicTitleInfo"}>{Topic.topicName}</h1>
            <div className={"topicinfocontainer"}>
                <div className={"sectie title"}>
                    <div className={"sectie content"}>
                        <div className={"tekst"}><h3>Description:</h3> {Topic.description_topic}</div>
                        <div className={"tekst"}>
                            <h3>Promotor:</h3> {Promotor? <div className={"inline"}>&emsp;  {Promotor.firstName} {Promotor.lastName}</div> : "None"}
                        </div>
                        <div className={"tekst"}>
                            <h3>TargetAudience:</h3> {TargetAudience.map((target) => (
                            <div key={target.id}> &emsp; {target.campus.campus_name} - {target.course.course_name}</div>
                        ))}
                        </div>
                        {KeywordInfo()}
                    </div>
                </div>

                <div className={"sectie title"}>
                    <h2>Contact</h2>
                    {ProvInfo()}
                </div>

            </div>
            {!BoostedStudent && <form>

                <select
                    name="boost"
                    onChange={(e) => {
                        setSelectStudent(e.target.value);
                    }}

                >
                    <option key={0}/>
                    {Students.map((variable) => <option key={variable.id} value={variable.id}>
                        {variable.firstName + " " + variable.lastName}
                    </option>)}
                </select>

                <button
                    onClick={handleOnclick}
                >Boost Student</button>
            </form>}
            {BoostedStudent && <p>{BoostedStudent}</p>}


        </div>
    )
}