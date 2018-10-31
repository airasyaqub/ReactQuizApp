import React, { Component } from 'react';
import { Card, Col, Row, Spin, Button } from 'antd';
import JS from '../../assets/images/js.png'
import HTML from '../../assets/images/html.png'
import CSS from '../../assets/images/css3.png'
import './subQuizzes.css';
import firebase from '../../firebase.js';

const { Meta } = Card;

const dbRef=firebase.database();

class SubQuizzes extends Component{
  constructor(props){
    super(props);
    var cover;
    var show;
    switch(props.category){
      case 'html':
        cover=HTML;
        show='htmlQuiz';
        break;
      case 'css':
        cover=CSS;
        show='cssQuiz';
        break;
      case 'js':
        cover=JS;
        show='jsQuiz';
        break;
      default:
    }
    this.quizRef=dbRef.ref(show);
    this.passingRef=dbRef.ref('passingCriteria').child(show);
    this.givenQuiz=dbRef.ref('users').child(`${this.props.userId}/${show}`);
    //this.quizCategoryObject=null
    //console.log(this.quizCategoryObject);
    this.state={
      quizCategoryObject:null,
      passingMarks:null,
      coverPic:cover,
      quizToShow:show,
      loader:true,
      quizAlreadyGiven:null
    }

  }


  componentDidMount(){
    var quizCategoryObject,passingMarks,quizAlreadyGiven;
    //console.log(this.quizRef.exists);
    this.quizRef.once('value',(data)=>{
      quizCategoryObject=data.val();
      //console.log(quizCategoryObject);
      //this.setState({quizCategoryObject:data.val(),loader:false})
      this.passingRef.once('value',(data)=>{
        passingMarks=data.val();
        //console.log(passingMarks,quizCategoryObject);
        this.givenQuiz.once('value',(data)=>{
          quizAlreadyGiven = data.val();
          this.setState({quizCategoryObject,passingMarks,loader:false,quizAlreadyGiven})
        })
      })
    })
    
  }

  render(){
    const {quizCategoryObject, coverPic, loader, passingMarks, quizAlreadyGiven}=this.state;
    //console.log(quizCategoryObject);
    //console.log(loader);
    //console.log(quizAlreadyGiven);
    return (
      <div className='quizSubClasses' style={{padding: '30px' }}>
        {loader?
          <Spin size="large" className='spinner'/>
          :
          quizCategoryObject?
            <Row gutter={20}>
            {Object.keys(quizCategoryObject).map((quizName,index)=>{
              //console.log(quizName);
              return(
              <Col md={8} className="centerChild" key={quizName}>
                <div>
                  <Card hoverable style={{width: 300}}
                  cover={<img alt="example" src={coverPic} />}
                  >
                    <Meta title={this.props.category.toUpperCase()+` Quiz ${++index}`}/>
                    <br/>
                    <p>Passing marks: {passingMarks[quizName]}%</p>
                    {quizAlreadyGiven&&quizAlreadyGiven.hasOwnProperty(quizName) ?
                      <div className='quizGivenInfo'>
                        <p>Date: {quizAlreadyGiven[quizName].date}</p>
                        <p>Obtained Score: {quizAlreadyGiven[quizName].score}%</p>
                        <p>Status: {quizAlreadyGiven[quizName].result}</p>
                        <Button type="primary" className='enterQuizBtn' disabled>Enter</Button>
                      </div> 
                      :
                      <div className='quizNotGivenInfo'>
                        <p>Total questions: {Object.keys(quizCategoryObject[quizName]).length}</p>
                        <Button type="primary" className='enterQuizBtn' onClick={()=>this.props.subQuizHandler('proctoringPage',quizName,true)}>Enter</Button> 
                      </div>
                    }
                  </Card>
                </div>
              </Col>
              )
            })}
          </Row>:
          <h2>No Quiz Added Yet</h2>
        }
      </div>
    )
  }

}


export default SubQuizzes