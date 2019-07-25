import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from "./Main";
import Help from "./Help";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/help" component={Help} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
