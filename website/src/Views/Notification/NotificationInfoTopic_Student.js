import React from "react";

export default function NotificationInfo_Student(props) {

    const topic = props.topic;
    return(
        <div className={"showTopicInfo"}>
            <div className={"topicinfocontainer"}>
                {
                    topic? topic.topicName: "Something went wrong..."
                }
            </div>
        </div>
    )
}

