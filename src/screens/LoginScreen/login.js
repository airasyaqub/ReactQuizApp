import React, { Component } from 'react';
import './login.css';
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';


const FormItem = Form.Item;


class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state={
      loginPage:true
    }
    this.showRegisterPage=this.showRegisterPage.bind(this);
    this.showLoginPage=this.showLoginPage.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      console.log(err);
      if (!err) {
        const { loginPage } = this.state;
        console.log('Received values of form: ', values);
        this.props.loggingIn(values, loginPage);
      }
    });

  }

  showRegisterPage(e){
    e.preventDefault();
    this.setState({loginPage:false})
  }

  showLoginPage(e){
    e.preventDefault();
    this.setState({loginPage:true})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {loginPage}=this.state;
    return (
      <Form onSubmit={ this.handleSubmit } className="login-form">
        <h3>{loginPage?'Login':'Register'}</h3>
        <Divider />
        {!loginPage && <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>}
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            {loginPage?'Log in':'Register'}
          </Button>
          Or {loginPage? <a onClick={this.showRegisterPage}>register now!</a>
          :
          <a onClick={this.showLoginPage}>Log in</a>
         }
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login





 
