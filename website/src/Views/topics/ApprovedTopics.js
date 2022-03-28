import React from "react";
import axios from "axios";
import {HiUsers} from "react-icons/all";
import {PreferredTopic} from "./PreferredTopic"


const approvedTopics = axios.create({
    baseURL: `http://localhost:8080/topics/approved`
})

const promotors = axios.create({
    baseURL: `http://localhost:8080/promotors/{id}`
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
        promotors.get('/').then(res => {
            console.log(res);
            this.setState({prom :res.data})
        })
        // axios.all([approvedTopics, promotors]).then(axios.spread((...res) => {
        //     const topic = res[0]
        //     const promotor = res[1]
        // }))
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
                                <PreferredTopic className={"buttonheart"} gevuld={false}></PreferredTopic>
                            </div>
                            <div className={"topicDescriptionbox contentintopicbow"}>
                                {topic.description_topic}
                            </div>
                            <div className={"topicPromotorbox contentintopicbow"}>
                                {topic.promotor_id}
                            </div>
                            <div className={"studentenmetinfo"}>
                                <div className={"topicAantalStudentenbox contentintopicbow"}>
                                    <HiUsers className={"persoonicoontopic"}></HiUsers>
                                    aantal studenten: {topic.aantal_studenten}
                                    </div>
                                <button className={"info_topic_button"}>Info</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            // <div >
            //     {this.state.apprTopics.map(topic =>
            //         <div className={"topiccontainer"}>
            //             <div key = {topic.id} className={"topicbox"}>
            //                 <div className={"topicmetheart"}>
            //                     <div className={"topictitleinbox"}>
            //                         {topic.topicName}
            //                     </div>
            //                     <PreferredTopic className={"buttonheart"} gevuld={false}></PreferredTopic>
            //                 </div>
            //                 <div className={"topicDescriptionbox contentintopicbow"}>
            //                     {topic.description_topic}
            //                 </div>
            //                 <div className={"topicPromotorbox contentintopicbow"}>
            //                     {this.state.prom.map(promotor => {
            //                         {prom.promotor_id === topic.promotor_id} {promotor_id}
            //                 }
            //                 </div>
            //                 <div className={"studentenmetinfo"}>
            //                     <div className={"topicAantalStudentenbox contentintopicbow"}>
            //                         <HiUsers className={"persoonicoontopic"}></HiUsers>
            //                         aantal studenten: {topic.aantal_studenten}
            //                     </div>
            //                     <button className={"info_topic_button"}>Info</button>
            //                 </div>
            //             </div>
            //         </div>
            //     )}
            // </div>
        )
    };
}