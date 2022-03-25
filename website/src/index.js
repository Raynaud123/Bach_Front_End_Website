import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import Error404 from "./Views/Error404";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App
                                        isLoggedIn={true}
                                        roles={"student"}
          />}/>
          <Route path="*" element={<Error404
              isLoggedIn={true}
              roles={"student"}
          />}/>
      </Routes>
  </BrowserRouter>,
  rootElement
);
