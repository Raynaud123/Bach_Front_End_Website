import React from "react";
import axios from 'axios';


export default function BedrijfTopic(){

    const [formValue, setformValue] = React.useState({
        Question: '',
        Description: ''
    });


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
        <form onSubmit={handleSubmit}>
            <p>Add a new Topic</p>
            <input
                type="text"
                name="Question"
                placeholder="Provide a one sentence Question"
                value={formValue.question}
                onChange={handleChange}
            />
            <input
                type="text"
                name="Description"
                placeholder="Provide a Question Description"
                value={formValue.description}
                onChange={handleChange}
            />
            <button type="submit">
                Add question
            </button>
        </form>
    )
}