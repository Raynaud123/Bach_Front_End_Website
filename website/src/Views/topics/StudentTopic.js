import React from "react";
import ApprovedTopics from "../topics/ApprovedTopics";
import '../../Styles/Topics.css';

export default function StudentTopic(){
    return(
        <div className={"showTopics"}>
            <div className={"titel"}>
                <h1 className={"topicTitle titel"}> Masterthesis Topics </h1>
                <h4 className={"ronde titel"}><b>First Round</b> </h4>
            </div>
            <div className={"filter"}>
                <a>Filter</a>
            </div>
            <ApprovedTopics />
        </div>
    )
}