import React from "react";
import "./app.css";
import {Link} from "react-router-dom";

class Navbar extends React.Component{

  constructor(){
    super();
  }


  render(){

    return(
      <nav className={this.props.display?"display-block":"display-none"}>
       <Link to="/">
       <h1 id="main-title">BIBLE GAMES</h1>
       </Link>
      </nav>
    )
  }

}

export default Navbar;
