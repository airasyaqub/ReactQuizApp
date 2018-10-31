import React, { Component } from 'react';
import { Card, Col, Row, Spin, Button } from 'antd';
import './resultScreen.css';
import './circle.css';
//import './circle.scss';
import firebase from '../../firebase.js';


const dbRef=firebase.database();

class ResultScreen extends Component{

// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

constructor(props){

  super(props);

  this.state={
    loader: true,
    passingScore:null,
    date:null,
    userScore:null
  }
}


componentDidMount(){

  //const { loader} = this.state;
  //console.log(loader)
 // Number from 0.0 to 1.
  dbRef.ref('passingCriteria').child(this.props.mainQuiz+'Quiz').child(this.props.subQuiz).once('value',(snapShot)=>{
    dbRef.ref('users').child(`${this.props.userId}/${this.props.mainQuiz}Quiz/${this.props.subQuiz}`).once('value',(snapShot1)=>{
      //console.log(snapShot1.val());
      this.setState({passingScore:snapShot.val(), loader:false, date:snapShot1.val().date, userScore: snapShot1.val().score })
    });
   
  })
}


render(){
  const { loader, passingScore, userScore } = this.state;
  var text;
  var color;
  if(!loader){
    if(parseInt(userScore)>=parseInt(passingScore)){
      color='green'; 
      text='Congratulations you have passed';
    }else{
      color='orange';
      text='Sorry you have failed'
    }
  }
  //console.log(userScore,date,passingScore,color);
  return(
    <div className='result'>
      {loader?
        <Spin size="large" className='spinner'/>
        :
        <Row type="flex" justify="space-around" align="middle">
          <Col md={12} sm={16} xs={20}>
            <Card title='Result' bodyStyle={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <div className={`c100 p${userScore} big ${color}`}>
                  <span>{`${userScore}%`}</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>              
              <h2>{text}</h2>
              <Button type="primary" className='homeBtn' onClick={this.props.getHome}>Home</Button>
            </Card>
          </Col>
        </Row>
      }
    </div>
  )
}
}

export default ResultScreen