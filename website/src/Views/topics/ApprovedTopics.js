import React from "react";
import axios from "axios";
import {HiUsers} from "react-icons/all";
import {PreferredTopic} from "./PreferredTopic"
import {Link} from "react-router-dom";

const approvedTopics = axios.create({
    baseURL: `http://localhost:8080/topic/approved`
})

const promotorswithtopic = axios.create({
    baseURL: `http://localhost:8080/promotor/withtopic`,
    // withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
})


export default class ApprovedTopics extends React.Component{

    state = {
        apprTopics : [],
        prom : [],
    }

    componentDidMount() {
        approvedTopics.get('/').then(res => {
            console.log(res);
            this.setState({apprTopics :res.data})
        })
        promotorswithtopic.get('/').then(res => {
            console.log(res);
            this.setState({prom :res.data})
        })
    }

    render(){
        return(
            <div >
                {this.state.apprTopics.map(topic =>
                    <div className={"topiccontainer"}>
                        <div key = {topic.id} className={"topicbox"}>
                            <div className={"topicmetheart"}>
                                <div className={"topictitleinbox"}>
                                    {topic.topicName}
                                </div>
                                <PreferredTopic className={"buttonheart"} gevuld={false}/>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"topicPromotorbox contentintopicbow"}>
                                promotor id: {topic.promotor_id}
                                {this.findNameProm(topic.promotor_id)}
                                {/*{this.state.prom.indexOf(topic.promotor_id)}*/}
                            </div>
                            <div className={"studentenmetinfo"}>
                                <div className={"topicAantalStudentenbox contentintopicbow"}>
                                    <HiUsers className={"persoonicoontopic"}/>
                                    aantal studenten: {topic.aantal_studenten}
                                    </div>
                                <button className={"info_topic_button"}>
                                    <Link to={{
                                        pathname: `/topics/info/${topic.topicName}`,
                                    }}
                                    >Info</Link></button>
                                {/*<button className={"info_topic_button"}><Route path="topics/info" element={<TopicInfo*/}
                                {/*    isLoggedIn={true}*/}
                                {/*    roles={"student"}*/}
                                {/*    topicid={topic.id}*/}
                                {/*/>}/></button>*/}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    findNameProm(id) {
        return this.state.prom.indexOf(id).firstName;
    }
}