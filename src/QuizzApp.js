import React from "react";
import questionsData from "./questions";
import MainGame from "./MainGame";
import "./app.css";
import {Link} from "react-router-dom";

let interval ;
class QuizzApp extends React.Component{

  constructor(){
    super();
    this.state ={
      seconds:60,
      minutes:9,
      questions:[],
      currentQuestionIndex:0,
      answers:[],
      totalPoints:0,
      gameOver:false
    };
    this.handleClick = this.handleClick.bind(this);
    this.setLogic = this.setLogic.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

  componentDidMount(){
    const timeContainer = document.querySelector(".time-container");
    const pointsContainer = document.querySelector(".points");
      this.setState(prevState=>{
        prevState.seconds=5;
        prevState.minutes=0;
        return prevState;
      })
    interval = setInterval(()=>{
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;
        seconds--;
        if(seconds===0){
          minutes--;
          seconds = 59;
        }
        if(minutes<0)
        {
          this.gameOver();
          window.clearInterval(interval);
          minutes = 0;
          seconds = 0;
        }
        else{
          this.setState((prevState)=>{
            prevState.seconds = seconds;
            prevState.minutes = minutes;
            return prevState;
          });
        }
        if(seconds>=10)
        timeContainer.textContent = `${minutes}:${seconds}`;
        else
        timeContainer.textContent = `${minutes}:0${seconds}`;

      },1000);
 /*
   Here we implement the getting of data from file
 */

    this.setState({
      questions:this.shuffle(questionsData)
    });
    this.setState((prevState)=>{
    let currentQuestion = prevState.questions[prevState.currentQuestionIndex];
    let answers=[];
     answers.push(currentQuestion.answer1);
     answers.push(currentQuestion.answer2);
     answers.push(currentQuestion.answer3);
     answers.push(currentQuestion.answer4);

     answers = this.shuffle(answers);
     prevState.answers.length=0;
     prevState.answers = answers;
     return prevState;

      });
      // const pointsContainer = document.querySelector(".points");

      pointsContainer.textContent = this.state.totalPoints;
}

setLogic(){
  this.setState((prevState)=>{
    let currentQuestion = prevState.questions[prevState.currentQuestionIndex];
    let answers=[];
     answers.push(currentQuestion.answer1);
     answers.push(currentQuestion.answer2);
     answers.push(currentQuestion.answer3);
     answers.push(currentQuestion.answer4);

     answers = this.shuffle(answers);
     prevState.answers.length=0;
     prevState.answers = answers;

   return prevState;

   });

}


restartGame(){

    this.setState({
      gameOver:false,
    });
    const timeElem = document.querySelector(".time");
    const pointsElem = document.querySelector(".points-container");
    timeElem.style.visibility = "visible";
    pointsElem.classList.remove("display-none");

    const timeContainer = document.querySelector(".time-container");
    const pointsContainer = document.querySelector(".points");
    timeContainer.textContent = "10:00";
      this.setState(prevState=>{
        prevState.seconds=59;
        prevState.minutes=9;
        return prevState;
      })
    interval = setInterval(()=>{
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;
        seconds--;
        if(seconds===0){
          minutes--;
          seconds = 59;
        }
        if(minutes<0)
        {
          window.clearInterval(interval);
          minutes = 0;
          seconds = 0;
        }
        else{
          this.setState((prevState)=>{
            prevState.seconds = seconds;
            prevState.minutes = minutes;
            return prevState;
          });
        }
        if(seconds>=10)
        timeContainer.textContent = `${minutes}:${seconds}`;
        else
        timeContainer.textContent = `${minutes}:0${seconds}`;

      },1000);


/*
 Here we implement the getting of data from file
*/

  this.setState(prevState=>{
    prevState.totalPoints=0;
    pointsContainer.textContent = 0;
    prevState.questions=this.shuffle(questionsData);
    prevState.currentQuestionIndex = 0;
  });

  this.setState((prevState)=>{
  let currentQuestion = prevState.questions[prevState.currentQuestionIndex];
  let answers=[];
   answers.push(currentQuestion.answer1);
   answers.push(currentQuestion.answer2);
   answers.push(currentQuestion.answer3);
   answers.push(currentQuestion.answer4);

   answers = this.shuffle(answers);
   prevState.answers.length=0;
   prevState.answers = answers;
   return prevState;

    });
    // const pointsContainer = document.querySelector(".points");
    pointsContainer.textContent = this.state.totalPoints;

}


gameOver(){
  this.setState({
    gameOver:true
  });

  window.clearInterval(interval);
  const timeElem = document.querySelector(".time");
  const pointsElem = document.querySelector(".points-container");
  timeElem.style.visibility = "hidden";
  pointsElem.classList.add("display-none");

}


  handleClick(evt){
    const pointsContainer = document.querySelector(".points");
    let answText = evt.target.textContent;

    if(answText===this.state.questions[this.state.currentQuestionIndex].answer1)
    {
      const mainGameContainer = document.querySelector("#main-game-container");
      mainGameContainer.classList.add("correct");
      mainGameContainer.classList.remove("default-shadow");
      this.setState(prevState=>{
        pointsContainer.textContent = prevState.totalPoints+100;
        prevState.totalPoints=prevState.totalPoints+100;
        return prevState;
      });
      setTimeout(function(){
        mainGameContainer.classList.remove("correct");
        mainGameContainer.classList.add("default-shadow");

      },1000);
    }
    else{
      const mainGameContainer = document.querySelector("#main-game-container");
      mainGameContainer.classList.add("wrong");
      mainGameContainer.classList.remove("default-shadow");
      setTimeout(function(){
        mainGameContainer.classList.remove("wrong");
        mainGameContainer.classList.add("default-shadow");

      },1000);
    }
 /* AICI AVEM LOGICA DE NEXT QUESTION IMPLEMENTATA!!! */
  setTimeout(()=>{
    this.setState(prevState=>{
      if(prevState.currentQuestionIndex+1<prevState.questions.length)
       {
         prevState.currentQuestionIndex+=1;
         this.setLogic();
       }
      else{
        prevState.gameOver=true;
        this.gameOver();
      }
      return prevState;
    });
  },1300);
}

  render(){
    return(
      <div className="main-game">
        <p className="time"><img src={require("./Images/clock.png")} alt="clock logo" className="clock-logo"/><span className="time-container">10:00</span></p>
        <p className="points-container">Puncte:<span className="points">0</span></p>
        {!this.state.gameOver?<div className="default-shadow" id="main-game-container">
          <MainGame questions={this.state.questions} answers={this.state.answers} currentQuestion={this.state.currentQuestionIndex} nextStage={this.handleClick}/>
        </div>:
      <div className="card">
      <h1>Jocul s-a incheiat</h1>
      <h2>Puncte totale:{this.state.totalPoints}</h2>
      <button onClick={this.restartGame} className="action-btn">Joaca din nou</button>
      <Link to="/">
      <button className="action-btn">Intoarce-te inapoi</button>
      </Link>
      </div>}
      </div>
    )
  }

}

export default QuizzApp;
