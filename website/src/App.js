import './Styles/App.css';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Views/Login/AuthProvider";

export default class App extends React.Component{

  render() {
      return(
              <BrowserRouter>
                    <AuthProvider>
                    </AuthProvider>
              </BrowserRouter>
      )
    }
  }







