import React from "react";
import {Link} from "react-router-dom";
import "./app.css";

class Cards extends React.Component{

  constructor(){
    super();
  }

  render(){
    return(
      <div>
        <div className="card">
          <h1>Intrebari biblice</h1>
          <img src={require("./Images/quiz-img.jpeg")} alt="bible quiz img" className="quiz-img"/>
          <p className="description">Testeaza-ti cunostiintele biblice cu un mic joc de tip quiz</p>
          <Link to="/quizzapp">
          <button className="play-btn" onClick={function(){window.scrollTo(0,0)}}>Joaca!</button>
          </Link>
        </div>
      </div>
    )
  }

}

export default Cards;
