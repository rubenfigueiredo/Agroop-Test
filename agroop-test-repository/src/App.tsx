import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Areas from "./containers/Areas";
import AddAreas from "./containers/AddAreas";
import Header from "./components/Header";
import UpdateArea from "./containers/UpdateArea";
import Devices from "./containers/Devices";
import SoilMoisture from "./containers/SoilMoisture";
import "./App.scss"; //unused
import styles from './styles/layout/body.module.scss';


const App = () => (
  <BrowserRouter>
    <div className={styles.main}>
      <Header/>
      <Switch>
        <Route path="/areas" component={Areas} />
        <Route path="/add-areas" component={AddAreas} />
        <Route path="/update-area/:id" component={UpdateArea} />
        <Route path="/devices" component={Devices} /> 
        <Route path="/device/:id" component={SoilMoisture} /> 
        <Redirect from="/*" to="/areas" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
