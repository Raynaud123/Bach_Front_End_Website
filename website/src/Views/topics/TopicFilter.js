import React from "react";
import axios from "axios";
// import {FiSearch} from "react-icons/all";
import '../../Styles/Topics.css';

//https://www.youtube.com/watch?v=RM_nXOyHwN0

const allTargetAudience = axios.create({
    baseURL: `http://localhost:8080/targetaudience/all`
})

export default class TopicFilter extends React.Component{

    state = {
        data : []
    }

    componentDidMount() {
        allTargetAudience.get('/').then(res => {
            console.log(res);
            this.setState({data :res.data})
        })
    }

    render(){
        return(
            <div >
                {/*{this.state.data.map(targetaudience =>*/}
                {/*    <div key = {targetaudience.id}>*/}
                {/*        {targetaudience.state.campus}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        )
    };
}