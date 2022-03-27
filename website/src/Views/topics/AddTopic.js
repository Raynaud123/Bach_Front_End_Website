import React from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom"


export default function AddTopic(){

    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: ''
    });

    const navigate= useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();


        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8080/topics",
                data: {
                    topicName: formValue.Question,
                    description_topic: formValue.Description
                },
                headers: { "Content-Type": "application/json" },
            });
            console.log(response)
            navigate("/topic")
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