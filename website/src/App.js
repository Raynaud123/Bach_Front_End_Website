import './Styles/App.css';
import Data from './Data.js'
import Footer from "./Views/Footer";
import Header from "./Views/Header"
import React from 'react';
import axios from 'axios';


const approvedTopics = axios.create({
  baseURL: `http://localhost:8080/topics/approved`
})

export default class App extends React.Component{

  state = {
    hideData: false
  }

  knop = () => {
    this.setState((state) => {
      return{
        hideData: !state.hideData
      }
    })
  }

  toevoegen = async () => {
    await approvedTopics.post('/',{
      topicName: "TopicName", description_topic: "TopicDescription"
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log("err" + err);
    })
  }

  render()
  {
    return (
        <div className="App">
          <Header />
          <button onClick={this.knop}>Druk hier om de onderwerpen weg te laten of te tonen</button>
          {this.state.hideData && <Data />}
          <button onClick={this.toevoegen}>Druk hier om topic toe te voegen</button>
          <Footer />
        </div>
    );
  }

}
