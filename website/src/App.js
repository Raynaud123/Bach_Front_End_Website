import './App.css';
import Data from './Data.js'
import React from 'react';
import axios from 'axios';

/*
function App() {
  return (
    <div className="App">

    </div>
  );
}*/

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
  /*
  toevoegen = async () => {
    await students.post('/',{
      name: "beke",
    }).then(res => {
      console.log(res);

    }).catch(err => {
      console.log("err" + err);
    })

    <button onClick={this.toevoegen}>Druk hier om persoon toe te voegen</button>

  }*/

  render()
  {
    return (
        <div className="App">
          <button onClick={this.knop}>Druk hier om de onderwerpen weg te laten of te tonen</button>
          {this.state.hideData && <Data />}
        </div>
    );
  }

}
