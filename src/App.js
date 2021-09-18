import "./App.css";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

export default class App extends Component {
  
  // console.log(this.ap);
  render() {
    return (
      <div>
        <Router>
          {/* Hello my first class based Component */}
          <Navbar />
          {/* <News  country="in" category="technology" /> */}
          <Switch>
            <Route exact path="/">
            <News key="general" country="in" category="general" />
            </Route>
            <Route exact path="/business">
            <News key="business" country="in" category="business" />
            </Route>
            <Route exact path="/entertainment">
            <News key="entertainment" country="in" category="entertainment" />
            </Route>
            <Route exact path="/science">
            <News key="science" country="in" category="science" />
            </Route>
            <Route exact path="/sports">
            <News key="sports" country="in" category="sports" />
            </Route>
            <Route exact path="/technology">
            <News key="technology" country="in" category="technology" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
