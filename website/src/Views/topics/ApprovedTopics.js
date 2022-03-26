import React from "react";
import axios from "axios";

const approvedTopics = axios.create({
    baseURL: `http://localhost:8080/topics/approved`
})

export default class ApprovedTopics extends React.Component{

    state = {
        data : []
    }

    componentDidMount() {
        approvedTopics.get('/').then(res => {
            console.log(res);
            this.setState({data :res.data})
        })
    }

    render(){
        return(
            <div >
                {this.state.data.map(topic =>
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topictitleinbox"}>
                                {topic.topicName}
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"topicAantalStudentenbox contentintopicbow"}>
                                {topic.aantal_studenten}
                            </div>
                            {/*<div className={"topicPromotorbox contentintopicbow"}>*/}
                            {/*    {topic.promotor_id}*/}
                            {/*</div>*/}
                        </div>

                    </div>
                )}
            </div>
        )
    };
}