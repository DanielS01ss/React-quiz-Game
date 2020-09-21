import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import QuizzApp from "./QuizzApp";
import Cards from "./Cards";
import Navbar from "./Navbar";

class Main extends React.Component{

  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <Router>
        <Navbar display={this.props.navbarDisplay}/>
        <div className="games-container">
          <Switch>
            <Route path="/" exact component={Cards}/>
            <Route path="/quizzapp" component={QuizzApp}/>
          </Switch>
        </div>
        </Router>

      </div>
    )
  }

}

export default Main;
