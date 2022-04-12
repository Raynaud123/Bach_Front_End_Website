import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function TopicAdd_CompanyAndPromotor(){

    const axiosPrivate = useAxiosPrivate();
    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: '',
        StudentsAmount:0
    });
//    const arr = [];
    const [campus, setcampus] = useState([]);
    const [errMsg, setErrMsg] = useState('');



    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    let from = "/topic";

    useEffect(() => {
        let isMounted = true;

        //cancel request if component is unmountend
        const controller = new AbortController();
        const getCampus = async () => {
        try {
            const response = await axiosPrivate({
                method: "get",
                url: "/targetaudience/campus",
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
    getCampus();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [])


    const handleSubmit = async(e) => {

        try {
            const response = await axiosPrivate({
                method: "post",
                url: "http://localhost:8080/topic",
                data: {
                    topicName: formValue.Question,
                    description_topic: formValue.Description
                }
            });
            console.log(response)
            navigate(from, { replace: true });
        } catch(error) {
            console.log(error)
        }
    }

    const handleMultipleChange = (event) => {
        if(!campus.includes(event.target.value)){
            const test = () => setcampus((oldArray) => oldArray.concat(event.target.value));
            test();
        }
        console.log(campus);
    }



    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return(
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
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                </div>
                <div className={"inputgroup"}>
                    <label>Select Campus:</label>
                    <select
                        name="campus"
                        onChange={handleMultipleChange}
                    >
                        {data.map((campus) => <option key={campus.campus_id}value={campus.campus_name}>
                            {campus.campus_name}
                        </option> )}
                    </select>
                    <ul>
                        {campus.map((name) => <li key={name}>{name}</li>)}
                    </ul>
                </div>
                <button type="submit">
                    Add question
                </button>
            </form>
        </div>

    )
}