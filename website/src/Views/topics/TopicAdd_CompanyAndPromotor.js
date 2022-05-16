import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import Select from "react-select";


export default function TopicAdd_CompanyAndPromotor(props) {

    
    const id = props.persoonid;
    const roles = props.roles;

    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: '',
        StudentsAmount: 0,
        Email:"",
        FirstName:"",
        LastName:"",
        Tel:""
    });

    const [targetData, setTargetData] = useState([]);
    const [Target, setTarget] = useState([]);

    const [keywordData, setKeywordData] = useState([]);
    const [Keyword, setKeyword] = useState([]);
    
    const [CompanyComponent, setCompanyComponent] = useState(false);

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
                //console.log("response getTarget:" + response.data);
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
                //console.log(response.data);
                isMounted && setKeywordData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log("tyfus " + errMsg);
            }
        }

        getTarget();
        getKeyword();

        //Nog veranderen naar topicprovider company boolean
        if(roles === "COMPANY"){
            setCompanyComponent(true);
        }else {
            setCompanyComponent(false)
        }

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
            //console.log(key);
            const jep = JSON.stringify(test);
            //console.log(jep);
            const {label,value} = JSON.parse(jep);
            //console.log(value);
            targetIds.push(value);
        })


        Object.entries(Keyword).map(([key,test]) =>{
            //console.log(key);
            const jep = JSON.stringify(test);
            //console.log(jep);
            const {label,value} = JSON.parse(jep);
            //console.log(value);
            keywordIds.push(value);
        })


        if (CompanyComponent){
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
                    'firstname':formValue.FirstName,
                    'lastname':formValue.LastName,
                    'email':formValue.Email,
                    'tel':formValue.Tel,
                    'promotor_id':-1
                })
            });
            //console.log("response submit:"  + response)
            navigate(from, {replace: true});
        } catch (error) {
            console.log(error)
        }
        }else {
            try {
                const response = await axiosPrivate({
                    method: "post",
                    url: "/topic",
                    data: JSON.stringify({

                        'topicName': formValue.Question,
                        'description_topic': formValue.Description,
                        'aantal_studenten': formValue.StudentsAmount,
                        'targetAudience': targetIds,
                        'keywords': keywordIds,
                        'provider_id': props.persoonid
                    })
                });
                //console.log("response submit:"  + response)
                navigate(from, {replace: true});
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleTargetAudienceChange = (e) => {
        //console.log(e);
        if(e !== null){
            setTarget(e)
        };
    }

    const handleKeywordsChange = (e) => {
        //console.log(e);
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

    return (
        <div className={"center"}>
            <form onSubmit={handleSubmit}>
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
                    <label>Amount of students:</label>
                    <select
                        name="StudentsAmount"
                        value={formValue.StudentsAmount}
                        onChange={handleChange}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
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
                {CompanyComponent &&
                    <div>
                        <h3>Contact details:</h3>
                            <label>First name</label>
                            <input
                                type="text"
                                name="FirstName"
                                placeholder="Provide a Firstname"
                                value={formValue.FirstName}
                                onChange={handleChange}
                            />
                            <label>Last name:</label>
                            <input
                                type="text"
                                name="LastName"
                                placeholder="Provide a Lastname"
                                value={formValue.LastName}
                                onChange={handleChange}
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="Email"
                                placeholder="Provide an Email"
                                value={formValue.Email}
                                onChange={handleChange}
                            /><label>Phone:</label>
                            <input
                                type="tel"
                                name="Tel"
                                placeholder="Provide a phoneNumber"
                                value={formValue.Tel}
                                onChange={handleChange}
                            />
                    </div>
                }
                <button type="submit">
                    Add question
                </button>
            </form>
        </div>

    )
}