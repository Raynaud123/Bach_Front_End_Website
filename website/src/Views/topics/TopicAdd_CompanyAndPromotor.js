import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function TopicAdd_CompanyAndPromotor(props) {


    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: '',
        StudentsAmount: 0
    });

    const [targetData, setTargetData] = useState([]);
    const [selectTarget, setSelectTarget] = useState();
    const [Target, setTarget] = useState([]);
    const [targetId, setTargetId] = useState([]);

    const [keywordData, setKeywordData] = useState([]);
    const [selectKeyword, setSelectKeyword] = useState();
    const [Keyword, setKeyword] = useState([]);
    const [keywordId, setKeywordId] = useState([]);


    const target = [];
    const keyword = [];

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
                console.log("response getKey:" + response.data);
                isMounted && setKeywordData(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', {state: {from: location}, replace: true});
                console.log("tyfus " + errMsg);
            }
        }

        getTarget();
        getKeyword();


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();



        Target.map((test) => {
            var parsed=JSON.parse(test);
            console.log(parsed);
            const {id} = parsed;
            const rara = () =>{
                setTargetId(targetId.concat(id))
                console.log(targetId + "tes")
            };
            rara();
        })

        keyword.map((test) => {
            var parsed=JSON.parse(test);
            const {id} = parsed;
            const rara = () => setKeywordId((oldArray) => oldArray.concat(id));
            rara();
        })

        console.log(props.persoonid);
        console.log("test"  + targetId);
        console.log(keywordId);

        try {
            const response = await axiosPrivate({
                method: "post",
                url: "/topic",
                data: JSON.stringify({

                    'topicName': formValue.Question,
                    'description_topic': formValue.Description,
                    'aantal_studenten': formValue.StudentsAmount,
                    'targetAudience': targetId,
                    'keywords': keywordId,
                    'provider_id': props.persoonid
                })
            });
            console.log("response submit:"  + response)
            navigate(from, {replace: true});
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectButtonTarget = (event) => {


        console.log(selectTarget);
        const {id} = JSON.parse(selectTarget);
        var bool = false;
        if(Target.length !== 0){
            for(const i of Target){

                console.log(id);
                var parsed = JSON.parse(i);
                console.log(parsed.id);
                if(id === parsed.id){
                    bool = true;
                }
            }
            if(!bool){
                const test = () => setTarget(Target.concat(...selectTarget));
                test();
            }
        }else{
           const test = () => setTarget((oldArray) => oldArray.concat(...selectTarget));
           test();
        }

        console.log("test" + Target);
    }


    const handleSelectButtonKeyword = (event) => {
        console.log(selectKeyword);
        const {id, name} = JSON.parse(selectKeyword);
        console.log(id);
        var bool = false;
        console.log("lengte" + keyword.length);
        if(keyword.length !== 0){
            for(const i of Target) {
                console.log(id);
                var parsed = JSON.parse(i);
                console.log(parsed.id);
                if (id === parsed.id) {
                    bool = true;
                }
                if (!bool) {
                    const test = () => setKeyword((oldArray) => oldArray.concat(selectKeyword));
                    test();
                }
            }
        }else{
            const test = () => setKeyword((oldArray) => oldArray.concat(selectKeyword));
            test();
        }

        console.log("uitkomst" +  keyword);
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
                    <label>Select TargetAudience:</label>
                    <select
                        name="targetAudience"
                        onChange={(e) => {
                            setSelectTarget(e.target.value);
                        }}
                    >
                        <option key={0}/>
                        {targetData.map((variable) => <option key={variable.targetAudience_id}
                                                              value={JSON.stringify({"campus_name": variable.campus.campus_name,"course_name" : variable.course.course_name,"id":variable.targetAudience_id})}>
                            {variable.campus.campus_name} {variable.course.course_name}
                        </option>)}
                    </select>
                    <button type="button" onClick={handleSelectButtonTarget}>
                        Add TargetAudience
                    </button>
                    <ul>
                        {Target.map((name) =>{
                            if(name !== null){
                                console.log(name);
                                var parsed=JSON.parse(name);
                                const {campus_name,course_name, id} = parsed;
                                return(
                                    <li key={id}>{campus_name + " " + course_name}</li>)
                            }
                            })}
                    </ul>
                </div>
                <div className={"inputgroup"}>
                    <label>Select Keywords:</label>
                    <select
                        name="keywords"
                        onChange={(e) => {
                            setSelectKeyword(e.target.value);
                        }}
                    >
                        <option key={0}></option>
                        {keywordData.map((variable) => <option key={variable.keyword_id} value={JSON.stringify({"name": variable.keyword_name,"id":variable.keyword_id})}>
                            {variable.keyword_name}
                        </option>)}
                    </select>
                    <button type="button" onClick={handleSelectButtonKeyword}>
                        Add keyword
                    </button>
                    <ul>
                        {keyword.map((test) => {
                            var parsed=JSON.parse(test);
                            const {name, id} = parsed;
                            return(
                                <li key={id}>{name}</li>
                            )
                        })}
                    </ul>
                </div>
                <button type="submit">
                    Add question
                </button>
            </form>
        </div>

    )
}