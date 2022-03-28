import React from "react";
import axios from 'axios';
import {BsHeartFill, BsHeart} from "react-icons/all";

const preferredTopics = axios.create({
    baseURL: `http://localhost:8080/student/{id}/preferred`
})

export function PreferredTopic(props){
    let filled;
    filled=props.gevuld;
    function onToggle() { filled = !filled; }

    return (
        <button className={"buttonheart"} onClick={() => onToggle()} type={"button"}>{
            filled? <BsHeartFill className={"hearticoonfill"}></BsHeartFill>:
                    <BsHeart className={"hearticoon"}></BsHeart>
        }
        </button>
    )
}