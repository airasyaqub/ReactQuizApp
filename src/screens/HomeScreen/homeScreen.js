import React from 'react';
import { Card, Col, Row} from 'antd';
import JS from '../../assets/images/js.png'
import HTML from '../../assets/images/html.png'
import CSS from '../../assets/images/css3.png'
import './homeScreen.css'

const { Meta } = Card;

function HomeScreen( props ){
  //localStorage.setItem('screen','home');
  return (
    <div className='quizClasses' style={{padding: '30px' }}>
      <Row gutter={20}>
        <Col md={8} className="centerChild">
          <div onClick={()=>props.screenHandler('html')}>
            <Card hoverable style={{width: 300}}
            cover={<img alt="example" src={HTML} />}
            actions={["Enter Quiz"]}
            >
              <Meta title="HTML5 "/>
            </Card>
          </div>
        </Col>
        <Col md={8} className="centerChild">
          <div onClick={()=>props.screenHandler('css')}>
            <Card hoverable style={{width: 300}}
              cover={<img alt="example" src={CSS} />}
              actions={["Enter Quiz"]}
             >
              <Meta title="CSS3"/>
            </Card>
          </div>
        </Col>
        <Col md={8} className="centerChild">
          <div onClick={()=>props.screenHandler('js')}>
            <Card hoverable style={{width: 300}}
              cover={<img alt="example" src={JS} />}
              actions={["Enter Quiz"]}
            >
              <Meta title="JavaScript"/>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen