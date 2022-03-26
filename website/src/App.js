import './Styles/App.css';
import Topic from "./Views/Topic"
import React from 'react';
import axios from 'axios';
import Header from "./Views/Header";
import Footer from "./Views/Footer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Error404 from "./Views/Error404";


const approvedTopics = axios.create({
  baseURL: `http://localhost:8080/topics/approved`
})

export default class App extends React.Component{




  render() {

    if(false){
      return (
          <div>
            <p>Je bent niet ingelogd!!!</p>
          </div>
      );
    }
    else {
      return(
            <BrowserRouter>
              <Header
                  isLoggedIn={true}
                  roles={"student"}
              />
              <Routes>
                <Route path="/" element={<Topic
                    isLoggedIn={true}
                    roles={"bedrijf"}
                />}/>
                <Route path="*" element={<Error404
                    isLoggedIn={true}
                    roles={"student"}
                />}/>
              </Routes>
              <Footer/>
            </BrowserRouter>)
    }
  }






//  state = {
 //   hideData: false
 // }

 // knop = () => {
 //   this.setState((state) => {
 //     return{
 //       hideData: !state.hideData
 //     }
 //   })
 // }

  // toevoegen = async () => {
  //   await approvedTopics.post('/',{
  //     topicName: "TopicName", description_topic: "TopicDescription"
  //   }).then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log("err" + err);
  //   })
  // }

/*  render()
  {

/!*
    return (
        <div className="App">
          <Header
              isLoggedIn={this.props.isLoggedIn}
              roles={this.props.roles}
          />
          {/!*<button onClick={this.knop}>Druk hier om de onderwerpen weg te laten of te tonen</button>*!/}
          {/!*{this.state.hideData && <Data />}*!/}
          {/!*<button onClick={this.toevoegen}>Druk hier om topic toe te voegen</button>*!/}
          <Footer />
        </div>
    );*!/
  }*/

}
