import React, {useState} from "react";
import axios from 'axios';
import {BsHeartFill, BsHeart} from "react-icons/all";

const preferredTopics = axios.create({
    baseURL: `http://localhost:8080/student/{id}/preferred`
})

export const PreferredTopic = () => {
    const [filled, setFilled] = useState(false);

    return (
        <button className={"buttonheart"} onClick={() => setFilled(!filled)} type={"button"}>{
            filled? <BsHeartFill className={"hearticoonfill"}/>:
                    <BsHeart className={"hearticoon"}/>
        }
        </button>
    )
}