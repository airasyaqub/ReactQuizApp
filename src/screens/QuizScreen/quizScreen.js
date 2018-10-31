import React, { Component } from 'react';
import './quizScreen.css';
import SubQuizzes from '../../Components/subQuizzes/subQuizzes.js'
import ProctoringScreen from '../../Components/ProctoringPage/proctoring.js'
import QuizStartedScreen from '../../Components/QuizStartedScreen/quizStarted.js'
import ResultScreen from '../../Components/ResultScreen/resultScreen.js'

class QuizScreen extends Component{
  constructor(props){
    super(props)
    
    var screen=localStorage.getItem('quizScreen')||this.props.parentState.screens;
    var key=localStorage.getItem('proctoringKey')||null;
    var uid=this.props.parentState.user;
    //var page=localStorage.getItem('proctoringPage')||false;
    //console.log(screen,key);
    this.state={
      quizScreens:screen,
      //proctoringPage:page,
      userId:uid,
      proctoringKey:key,
    }
    this.screenToShowInQuizPage=this.screenToShowInQuizPage.bind(this);
    this.showUserResult = this.showUserResult.bind(this);
  }

  componentWillUnmount(){
    localStorage.removeItem('proctoringKey')
    localStorage.removeItem('quizScreen')
  }


  screenToShowInQuizPage(page,key){
    localStorage.setItem('quizScreen',page);
    localStorage.setItem('proctoringKey',key);
    //localStorage.setItem('proctoringPage',pp);
    this.setState({quizScreens:page,proctoringKey:key})
  }

  showUserResult(){
    localStorage.setItem('quizScreen','resultScreen');
    this.setState({quizScreens:'resultScreen'})
  }


  render(){
    const { quizScreens, proctoringKey, userId} = this.state;
    var subQuizzes;
    if(quizScreens==='html'||quizScreens==='css'||quizScreens==='js'){
      subQuizzes=true;
    }else{subQuizzes=false;}
    //console.log(quizScreens);
    return(
      <div className='quizScreen'>
        {subQuizzes && <SubQuizzes userId={userId} subQuizHandler={this.screenToShowInQuizPage} category={quizScreens}/>}
        {quizScreens==='proctoringPage' && <ProctoringScreen subQuizHandler={this.screenToShowInQuizPage} pKey={proctoringKey}/>}
        {quizScreens==='quizStarted'&&<QuizStartedScreen mainQuiz={this.props.parentState.screens} quizToStart={proctoringKey} showResult={this.showUserResult} userId={userId}/>}
        {quizScreens==='resultScreen'&&<ResultScreen mainQuiz={this.props.parentState.screens} subQuiz={proctoringKey} userId={userId} getHome={this.props.getHome}/>}
      </div>  
    )
  }
}

export default QuizScreen