import React, { Component } from 'react';
import { Card, Row, Col, Input, Button, Form, Icon, message } from 'antd';
import './proctoring.css'


const FormItem = Form.Item;

class ProctoringScreen extends Component{


  error = (text) => {
    message.error(text);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log(values);
        //console.log(this.props.pKey);
        if(this.props.pKey===values.password){
          this.props.subQuizHandler('quizStarted',this.props.pKey)
        }
        else{
          this.error('invalid key');
        }
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className='proctorPage'>
        <Row type="flex" justify="center" align="middle">
          <Col md={12} sm={16} xs={20}>
            <Card title="Enter Key">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input proctoring Key!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Key" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  
}

export default Form.create()(ProctoringScreen);;

