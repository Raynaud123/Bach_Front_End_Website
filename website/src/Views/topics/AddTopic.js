import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useLocation, useNavigate} from "react-router-dom"
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";


export default function AddTopic(){



    const axiosPrivate = useAxiosPrivate();
    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: ''
    });



    const [data, setData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    let from = "/topic";

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
                <button type="submit">
                    Add question
                </button>
            </form>
        </div>

    )
}