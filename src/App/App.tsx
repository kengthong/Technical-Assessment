import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// CSS
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from "./pages/Home";
// components

// services

const App = () => {
  return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
  );
};

export default App;
