import React from "react";
import "./app.css";

class MainGame extends React.Component{

  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <section>
         {this.props.questions.length>0?<p className="question">{this.props.questions[this.props.currentQuestion].question}</p>:null }
        </section>
        <div className="answers-container">
          <button className="answer-btn" onClick={this.props.nextStage}>{this.props.answers[0]}</button>
          <button className="answer-btn" onClick={this.props.nextStage}>{this.props.answers[1]}</button>
          <button className="answer-btn" onClick={this.props.nextStage}>{this.props.answers[2]}</button>
          <button className="answer-btn" onClick={this.props.nextStage}>{this.props.answers[3]}</button>
        </div>
      </div>
    )
  }

}

export default MainGame;
