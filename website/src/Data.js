// import React from "react";
// import axios from "axios";
//
// const approvedTopics = axios.create({
//     baseURL: `http://localhost:8080/topics/approved`
// })
//
// export default class Data extends React.Component{
//
//     state = {
//         data : []
//         }
//
//         componentDidMount() {
//             approvedTopics.get('/').then(res => {
//                 console.log(res);
//                 this.setState({data :res.data})
//             })
//         }
//
// /*    get = ()=>{
//         students.get('/').then(res => {
//             console.log(res);
//             this.setState({data :res.data})
//         })
//     }*/
//
// //    constructor() {
// //        super();
// //        this.get();
//  //   }
//     whichTopics = this.props.whichTopics;
//
//
//     render()
//     {
//         if(this.whichTopics === "onlyTopicsApproved"){
//             return(
//                 <div >
//                     {this.state.data.map(topic =>
//                         <li
//                         key = {topic.id}>{topic.topicName}
//                         </li>
//                         )
//                     }
//                 </div>
//             )
//         } else if (this.whichTopics === "all"){
//             return(
//                 <div >
//                     {this.state.data.concat()}
//                 </div>
//             )
//         }
//         else {
//             return (
//                 <ul>{this.state.data.map(topic => <li
//                     key={topic.id}>{topic.topicName + " " + topic.description_topic}</li>)}</ul>
//             );
//         }
//     };
//}