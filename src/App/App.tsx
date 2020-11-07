import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
// CSS
import "./App.css";

import "./css/bootstrap.css";
import "./css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/style.css";
import "./css/responsive.css";
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
