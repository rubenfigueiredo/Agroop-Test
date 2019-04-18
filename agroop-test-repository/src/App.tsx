import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Areas from "./containers/Areas";
import AddAreas from "./containers/AddAreas";
import Header from "./components/Header";
import UpdateArea from "./containers/UpdateArea";
import "./App.scss";
import styles from './styles/layout/body.module.scss';

const App = () => (
  <BrowserRouter>
    <div className={styles.main}>
      <Header/>
      <Switch>
        <Route exact path="/" component={Areas} />
        <Route exact path="/areas" component={Areas} />
        <Route exact path="/add-areas" component={AddAreas} />
        <Route exact path="/update-area/:id" component={UpdateArea} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
