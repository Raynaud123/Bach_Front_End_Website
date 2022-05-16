import React, {useEffect, useState} from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import Select from "react-select";
import {useLocation, useNavigate} from "react-router-dom";
import "../../../Styles/Home.css"
import "../../../Styles/Register.css"

export default function SubmitTopic_Student(props) {
    const studentId = props.persoonid;


    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: '',
        StudentsAmount: 1,
    });

    const [targetData, setTargetData] = useState([]);
    const [Target, setTarget] = useState([]);

    const [PromotorData, setPromotorData] = useState([]);
    const [Promotor,setPromotor] = useState([]);

    const [keywordData, setKeywordData] = useState([]);
    const [Keyword, setKeyword] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    let from = "/topic";


    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();
        const getTarget = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/targetaudience/hided/all",
                    signal: controller.signal
                });
                console.log("response getTarget:" + response.data);
                isMounted && setTargetData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log("tyfus " + errMsg);
            }
        }

        const getKeyword = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/keyword/all",
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setKeywordData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log("tyfus " + errMsg);
            }
        }

        const getPromotors = async () => {
            try {
                const response = await axiosPrivate({
                    method: "get",
                    url: "/promotor/student/" + studentId,
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPromotorData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log("tyfus " + errMsg);
            }
        }


        getTarget();
        getKeyword();
        getPromotors();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const keywordIds = [];
        const targetIds = [];

        Object.entries(Target).map(([key,test]) =>{
            console.log(key);
            const jep = JSON.stringify(test);
            console.log(jep);
            const {label,value} = JSON.parse(jep);
            console.log(value);
            targetIds.push(value);
        })


        Object.entries(Keyword).map(([key,test]) =>{
            console.log(key);
            const jep = JSON.stringify(test);
            console.log(jep);
            const {label,value} = JSON.parse(jep);
            console.log(value);
            keywordIds.push(value);
        })

        console.log(Promotor);

            try{
                const response = await axiosPrivate({
                    method: "post",
                    url: "/topic",
                    data: JSON.stringify({
                        'topicName': formValue.Question,
                        'description_topic': formValue.Description,
                        'aantal_studenten': formValue.StudentsAmount,
                        'targetAudience': targetIds,
                        'keywords': keywordIds,
                        'provider_id': props.persoonid,
                        'promotor_id': Promotor.value
                    })
                });
                console.log("response submit:"  + response)
                navigate(from, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }

    const handleTargetAudienceChange = (e) => {
        console.log(e);
        if(e !== null){
            setTarget(e)
        };
    }

    const handleKeywordsChange = (e) => {
        console.log(e);
        if(e !== null){
            setKeyword(e)
        };
    }


    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handlePromotorChange = (event) => {
        if(event !== null){
            setPromotor(event);
        }
    }



    return(
        <div className={"standaard"}>
            <h1>Submit a Topic as student</h1>
            <p>You must have a promotor for your topic otherwise your topic won't be approved! You also have to do the submitted topic on your own!</p>
            <form onSubmit={handleSubmit} className={"form-style-1"}>
                <h2>Add a new Topic</h2>
                <div className={"inputgroup"}>
                    <input
                        type="text"
                        name="Question"
                        placeholder="Provide a one sentence Question"
                        value={formValue.question}
                        onChange={handleChange}
                    />
                </div>
                <div className={"inputgroup"}>
                <textarea
                    type="text"
                    name="Description"
                    placeholder="Provide a Question Description"
                    value={formValue.description}
                    onChange={handleChange}
                />
                </div>
                <div className={"inputgroup"}>
                    <Select
                        name="secondSelectt"
                        options={targetData.map(e=>({label: e.campus.campus_name +"  "+e.course.course_name, value: e.targetAudience_id}))}
                        placeholder="Select TargetAudiences"
                        isSearchable
                        isMulti
                        isClearable
                        onChange={handleTargetAudienceChange}
                    />
                </div>
                <div className={"inputgroup"}>
                    <Select
                        name="secondSelectt"
                        options={keywordData.map(e=>({label: e.keyword_name , value: e.keyword_id}))}
                        placeholder="Select Keywords"
                        isSearchable
                        isMulti
                        isClearable
                        onChange={handleKeywordsChange}
                    />
                </div>
                <div className={"inputgroup"}>
                    <Select
                        name="secondSelectt"
                        options={PromotorData.map(e=>({label: e.lastName , value: e.id}))}
                        placeholder="Select Promotor"
                        isSearchable
                        isClearable
                        onChange={handlePromotorChange}
                    />
                </div>
                <button type="submit">
                    Add question
                </button>
            </form>
        </div>
    )
}
