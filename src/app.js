import React from "react";
import Navbar from "./Navbar.js";
import {logo} from "./logo.svg";
import "./app.css";
import Main from "./Main";

console.log(logo);
class App extends React.Component{
  constructor(){
    super();
    this.state = {

    }
    this.state ={
      navDisplay:false
    }

  }

  componentDidMount(){
    window.setTimeout(()=>{
       const logoImg = document.querySelector(".main-logo");
       logoImg.classList.add("hidden-logo");
    },2000);
    window.setTimeout(()=>{
      this.setState({
        navDisplay:true
      })
    },2900);
  }
  // <Navbar display={this.state.navDisplay}/>
  render(){
    return(
      <main>

      {this.state.navDisplay&&<Main navbarDisplay={this.state.navDisplay}/>}
      <img src={require("./Images/logo.svg")} className="main-logo" alt="main-logo" />
      </main>
    )
  }
}

export default App;
