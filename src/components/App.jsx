import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from "./Main";
import Help from "./Help";
import ErrorPage from "./ErrorPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/help" component={Help} />
            <Route path="/error" component={ErrorPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
