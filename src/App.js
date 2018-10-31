import React, { Component } from 'react';
import './App.css';
import Header from './Components/header/header.js'
import Login from './screens/LoginScreen/login.js'
import HomeScreen from './screens/HomeScreen/homeScreen.js'
import QuizScreen from './screens/QuizScreen/quizScreen.js'
import firebase from './firebase';
import { message, Spin} from 'antd';


const auth=firebase.auth();




class App extends Component {

  constructor(props){

    super(props);
    //this.userName=localStorage.getItem('userName');
    const screen=localStorage.getItem('screens')||'home';
    //const uid=localStorage.getItem('userId')||null;
    //console.log(auth.currentUser);
    this.state = { 
      user:null,
      displayName:null,
      screens:screen,
      loader:true
    }

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.screenToShow=this.screenToShow.bind(this);
    this.getToHome=this.getToHome.bind(this);
  }

  logIn(values, isLoggingIn){

    const email = values.email;
    const password = values.password;
    const error = (text) => {
      message.error(text);
    };
    if ( !isLoggingIn ) {

      auth.createUserWithEmailAndPassword( email, password ).then(( user ) => {
        //console.log( user );
        //console.log(values);
        this.setState({displayName:values.userName})
        //localStorage.setItem('userName',values.userName)
     }).catch( function( e ){
       error(e.message);
     });

    }
    else{
      auth.signInWithEmailAndPassword(email,password).then((user)=>{
        //console.log(user);
        //console.log(user.user);
        //localStorage.setItem('userName',user.user.displayName);
      }).catch(function(e){error(e.message);;});
    }

  }

  logOut(userWhichLogOut){
    const success = (text) => {
      message.success(text);
    };
    
    auth.signOut().then(()=>{
      success(`${userWhichLogOut} logged out`);
      localStorage.clear();
      this.setState({user:null,screens:'home'})
    });
  }

  componentDidMount(){
        
    const warning = (text) => {
      message.warning(text);
    };
    console.log(this.userName); 
    firebase.auth().onAuthStateChanged(( user ) => {
      if(user){

        //this.userName=localStorage.getItem('userName')
        var nowuser = firebase.auth().currentUser;

        if( !nowuser.displayName ){
          const { displayName }= this.state
          nowuser.updateProfile({ displayName: displayName }).then(()=>{

            //console.log(nowuser);

            if( !nowuser.emailVerified ){
              nowuser.sendEmailVerification().then(function() {
               // Email sent.
                warning('verify your email');
              }).catch(function( error ) {
                // An error happened.
                  error(error.message);
              });
            }

          });
        }
        //console.log(firebase.auth().currentUser);
        console.log(`${nowuser.uid} signed in`);
        //localStorage.setItem('userName',user.displayName);
        //localStorage.setItem('userId',nowuser.uid)
        this.setState({user:nowuser.uid, loader:false})
    
      }
      else{
        console.log('no one signed in');
        this.setState({loader:false})
      }
    });
  }

  screenToShow(page){
    localStorage.setItem('screens',page)
    this.setState({screens:page})
  }

  getToHome(){
    localStorage.setItem('screens','home');
    this.setState({screens:'home'})
  }

  mainAppComponents(){
    const { user, screens } = this.state;
    return (
      <div>
        <Header LogOut={this.logOut} getHome={this.getToHome}/>
        { !user && <Login loggingIn = { this.logIn }/> }
        { user && screens==='home' && <HomeScreen screenHandler = {this.screenToShow} /> }
        { user && screens!=='home' && <QuizScreen getHome={this.getToHome} parentState={this.state}/> }
      </div>
    )
  }

  render() {
    const { loader } = this.state;
    //console.log('rendereing '+user);
    //console.log(screens);
    let elem;
    if(loader){
      elem = <Spin size="large" className='spinner'/>;
    }else{
      elem= this.mainAppComponents();
    }

    return (
      <div className='App'>
        {elem}
      </div>
    );
  }
}

export default App;
