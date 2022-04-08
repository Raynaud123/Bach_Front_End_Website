import './Styles/App.css';
import Footer from "./Views/Footer";
import Header from "./Views/Header";
import Topic from "./Views/topics/Topic"
import AddTopic from "./Views/topics/AddTopic"
import Home from "./Views/Home"
import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Error404 from "./Views/Error404";
import TopicInfo from "./Views/topics/TopicInfo";
import Login from "./Views/Login/Login"
import Register from "./Views/Login/Register"
import {AuthProvider} from "./Views/Login/AuthProvider";
import RequireAuth from "./Views/RequireAuth";


export default class App extends React.Component{


  render() {

      return(

              <BrowserRouter>
                  <AuthProvider>
                  {/*<Routes>*/}

                  {/*    <Route path="/" element={*/}
                  {/*          <Home*/}

                  {/*          />*/}
                  {/*    }/>*/}

                  {/*    <Route path="/login" element={*/}
                  {/*        <Login*/}

                  {/*        />*/}
                  {/*    }/>*/}
                  {/*    <Route path="/register" element={*/}
                  {/*        <Register*/}

                  {/*        />*/}
                  {/*    }/>*/}


                  {/*    <Route element={<RequireAuth/>}>*/}
                  {/*        <Route path="/topic" element={*/}
                  {/*            <Topic*/}
                  {/*                roles={"student"}*/}
                  {/*            />*/}
                  {/*        }/>*/}
                  {/*        <Route path="/Add" element={<AddTopic*/}
                  {/*            roles={"bedrijf"}*/}
                  {/*        />}/>*/}
                  {/*        <Route path="topics/info/:t" element={<TopicInfo*/}
                  {/*            roles={"student"}*/}
                  {/*        />}/>*/}
                  {/*    </Route>*/}



                  {/*    <Route path="*" element={<Error404*/}
                  {/*        isLoggedIn={true}*/}
                  {/*        roles={"student"}*/}
                  {/*    />}/>*/}
                  {/*</Routes>*/}
                </AuthProvider>
              </BrowserRouter>
      )
    }
  }







