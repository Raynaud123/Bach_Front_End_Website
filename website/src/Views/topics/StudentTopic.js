import React from "react";
import ApprovedTopics from "../topics/ApprovedTopics";
import TopicFilter from "../topics/TopicFilter"
import '../../Styles/Topics.css';
import axios from "axios";

const phase = axios.create({
    baseURL: `http://localhost:8080/phase/now`
})

export default class StudentTopic extends React.Component{
    state = {
        phase : [],
    }
    componentDidMount() {
        phase.get('/').then(res => {
            console.log(res);
            this.setState({phase :res.data})
        })
    }

    render() {
        return (
            <div className={"showTopics"}>
                <div className={"titel"}>
                    <h1 className={"topicTitle titel"}>Masterthesis Topics</h1>
                    <h4 className={"ronde titel"}><b>First Round</b> &emsp;&emsp; {this.state.phase.phase_name} ({this.state.phase.begin_deadline} - {this.state.phase.end_deadline})</h4>
                </div>
                <TopicFilter/>
                <ApprovedTopics/>
            </div>
        )
    }
}