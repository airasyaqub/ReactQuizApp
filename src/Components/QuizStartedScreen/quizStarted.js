import React, { Component } from 'react';
import { Spin, Radio, Row, Col, Card, Button } from 'antd';
import './quizStarted.css';
import firebase from '../../firebase.js';



const dbRef=firebase.database();
const RadioGroup = Radio.Group;

class  QuizStartedScreen extends Component{
  constructor(props){
    super(props);

    var quizToStart = this.props.quizToStart;
    var mainQuizCategory = this.props.mainQuiz;
    //console.log(mainQuizCategory,quizToStart);
    var refNode = dbRef.ref(mainQuizCategory+'Quiz').child(quizToStart);
    var i = localStorage.getItem('iterator')||0;
    var arrAns = JSON.parse(localStorage.getItem("userAnswers")) || [];
    //console.log(typeof(i));
    //console.log(refNode);
    //var arr=localStorage.getItem('questionArray')||''

    this.state={
      loader:true,
      ref:refNode,
      questionArray:null,
      questionsObj:null,
      iterator:parseInt(i),
      value: null,
      userAnswers:arrAns,
      disabled:true
    }

    this.nextQuestion = this.nextQuestion.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }


  componentDidMount(){
    const {ref}=this.state;
    //localStorage.setItem('subMainQuiz',this.props.quizToStart)
    let arr;
    ref.once('value',(snapShot)=>{
      var obj=snapShot.val();
      arr=Object.keys(obj);
      //console.log(arr);
      //console.log(obj);
      //console.log(arr);
      this.setState({questionArray:arr,questionsObj:obj,loader:false})
    })
  }

  componentWillUnmount(){

    localStorage.removeItem('userAnswers');
    localStorage.removeItem('iterator');
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
      disabled:false
    });
  }

  nextQuestion(){
    let {iterator, value, userAnswers} = this.state;
    userAnswers.push(value);
    localStorage.setItem('userAnswers',JSON.stringify(userAnswers));
    iterator=parseInt(iterator);
    localStorage.setItem('iterator',++iterator);
    this.setState({iterator,userAnswers,value:null, disabled:true});
  }

  calculateResult(){

    let { userAnswers, questionsObj, questionArray, value} = this.state;
    let obtainedScore=0;
    let totalScore = questionArray.length;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    let percentage;
    let status;

    userAnswers.push(value);

    localStorage.setItem('userAnswers',JSON.stringify(userAnswers));

    localStorage.setItem('iterator',0);

    this.setState({
      userAnswers,
      value: null,
      iterator: 0
    })

    //userAnswers = userAnswers.filter(Boolean)
    questionArray.forEach(( e, i ) => {
      if( questionsObj[ e ]['correct'] === userAnswers[ i ]){
        obtainedScore = obtainedScore + 1;
      }
    });


    if(dd<10) {
      dd = '0'+dd
    } 

    if(mm<10) {
      mm = '0'+mm
    } 
    today = mm + '/' + dd + '/' + yyyy;

    percentage = (obtainedScore / totalScore) * 100;

    obtainedScore>=totalScore? status='pass':status='fail';

    dbRef.ref(`users/${this.props.userId}/${this.props.mainQuiz}Quiz/${this.props.quizToStart}`).update({
      score:Math.round(percentage),
      date:today,
      result:status
    }).then(()=>{
      this.props.showResult();
    })


  }


  render(){
    const { loader, iterator, questionArray, questionsObj, disabled, userAnswers} = this.state;

    if(!loader){
      //console.log(!(userAnswers.length===questionArray.length))
      if (userAnswers.length === questionArray.length) return null;
    }
    //console.log(value);
    //console.log(typeof(iterator));
    //console.log(userAnswers.length,questionArray.length)
    let totalQuestions;
    let optionsArr;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    if(!loader){
      totalQuestions=questionArray.length;
      optionsArr=Object.keys(questionsObj[questionArray[iterator]]).filter((e)=>e!=='correct'&&e!=='question');
      //console.log(optionsArr);
    }
    

    return(
      <div className='quizQuestions'> 
        {loader?
          <Spin size="large" className='spinner'/>
          :
          ( 
          <Row type="flex" justify="space-around" align="middle">
            <Col md={16} sm={20} xs={22}>
              <Card title={`${parseInt(iterator)+1} of ${totalQuestions}`}>
                <h2 className="questionText">{questionsObj[questionArray[iterator]].question}</h2>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                  {optionsArr.map((e,i)=><Radio key={e} style={radioStyle} value={e}>{questionsObj[questionArray[iterator]][e]}</Radio>
                  )}
                </RadioGroup>
                {iterator+1===questionArray.length ?
                <Button type="primary" className='nextBtn' disabled={disabled} onClick={this.calculateResult}>
                  Submit
                </Button>
                :
                <Button type="primary" className='nextBtn' disabled={disabled} onClick=
                {this.nextQuestion}>
                  Next
                </Button>
                }      
              </Card>
            </Col>
          </Row>
          )
        }
      </div>
    )
  }

}

export default QuizStartedScreen
