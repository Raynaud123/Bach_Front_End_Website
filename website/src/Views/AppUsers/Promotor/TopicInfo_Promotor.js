import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import PreferredTopic from "../../topics/PreferredTopic";
import TopicsPromotor  from "../../../Styles/TopicsPromotor.css";
import BoostComponent from "./BoostComponent";




export default function TopicInfo_Promotor(props) {

    const promotorid = props.promotorid;
    const topicid = useParams().topicid;
    const [Topic, setTopic] = useState([]);
    const [AantalStudenten, setAantalStudenten] = useState();
    const [Provider, setProvider] = useState([]);
    const [Promotor, setPromotor] = useState([]);
    const [Display,setDisplay] = useState(false);
    const [Phase, setPhase] = useState(true);
    const [TargetAudience, setTargetAudience] = useState([]);
    const [Students, setStudents] = useState([]);
    const [Keyword, setKeyword] = useState([]);
    const [SelectStudent, setSelectStudent] = useState();
    const [BoostedStudent, setBoostedStudent] = useState([]);
    const [BoostedComponent, setBoostedComponent] = useState(false);


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
                setAantalStudenten(response.data.aantal_studenten);
                console.log(response.data.aantal_studenten);
                await getProvider(response.data.provider);
                await getTargetAudience(response.data.targetAudiences);
                await getKeywords(response.data.keyword_list);
                await getPromotor(response.data.promotor);
                await getStudents();
                if(response.data.boostedStudent.length === 0) {
                    setBoostedComponent(true);
                }else {
                    setBoostedComponent(false);
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
                        url: "/topicprovider/approved/" + provid,
                        signal: controller.signal
                    });
                    isMounted && setProvider(response.data);
                } catch (err) {
                    if(err.response.status === 401){
                        navigate('/unauthorized',{replace:true});
                        console.log(err);
                    }
                    else{
                        console.error(err);
                        navigate('/login', {state: {from: location}, replace: true});
                        console.log(errMsg);
                    }

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
                        url: `/student/hided/all`,
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
        const getPhase = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/phase/now",
                    signal: controller.signal
                });
                // console.log(response.data);
                console.log(response.data.phase_id);
                if(response.data.phase_id == 3 || response.data.phase_id === 6 && isMounted){
                    setPhase(true)
                }
                else setPhase(false);
//                isMounted && setPhaseId(response.data.phase_id);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
                console.log(errMsg);
            }
        }

        getPhase();
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
        console.log(BoostedComponent);
        console.log(Phase);
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
                            <h3>TargetAudience:</h3> {Topic.targetAudiences? Topic.targetAudiences.map((target) => (
                            <div key={target.id}> &emsp; {target.campus.campus_name} - {target.course.course_name}</div>
                        )):<div/>}
                        </div>
                        {KeywordInfo()}
                    </div>
                </div>

                <div className={"sectie title"}>
                    <h2>Contact</h2>
                    {ProvInfo()}
                </div>
                {Phase && BoostedComponent &&<BoostComponent
                    aantalstudenten={AantalStudenten}
                    id={topicid}
                />}
            </div>


        </div>
    )
}