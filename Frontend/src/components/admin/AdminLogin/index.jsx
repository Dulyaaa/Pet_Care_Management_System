import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Image, Form } from 'react-bootstrap';
import login from '../../../assets/admin/login.jpg';
import './index.css';
import LoginService from '../../../Services/LoginService';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          currentUser: [],
          userInvalid: [],
    
          email: null,
          password: null,
          error: null,
          isFound: false,
          isValid: false,
    
        };
      }
      handleChange = this.handleChange.bind(this);
      shoot = this.shoot.bind(this);

      
  componentDidMount() {

}
 handleChange(event) {
  this.setState({
    [event.target.name]: event.target.value,
  });


}
shoot(event) {
 
  event.preventDefault();

  LoginService.getUser(this.state.email).then(res => {
    this.state.isFound = true;
    let user = res.data;
    console.log('User => ' + JSON.stringify(user));

    if (user == null) {
      this.state.isFound = false;
      alert("Invalid Credentials!!");
      return;
    }

    if (this.state.email == user.email && this.state.password == user.password) {
      this.state.isFound = true;
      window.sessionStorage.setItem("UserId", user.email);
      this.state.isValid = true;
      this.state.currentUser = user;
      this.props.history.push('/admin');

    } else {

      //window.sessionStorage.setItem("UserId", "NF");
      this.state.isValid = false;
    }
    if (this.state.isValid == true) {
      if (this.state.isValid == false && this.state.isFound == true) {
        this.state.isFound = true;
        alert("Password does not match with the given email!");

      }
    }

  });
}
    render() {

    
        return (
          <div className='section-title text-center'>
                    <h3>Log In</h3>
              
            <div className="container" >
                
                <Card border="primary" style={{ width: '100%' , marginTop: '1cm' }} >
                    <Card.Body>
                        <Row className="landing">
                            <Col>
                                <Image src={login} thumbnail style={{ border: "none", width: 400, height: 400, marginLeft: '13%' }} />
                            </Col>
                            <Col>
                                <br />
                                <Form style={{ width: "60%", marginTop: '5%' }}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label><h5>Email address</h5></Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        name = "email"
                                        placeholder="Enter email"
                                        value={this.state.email} 
                                        onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label><h5>Password</h5></Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        name = "password"
                                        placeholder="Password"
                                        value={this.state.password}
                                         onChange={this.handleChange} />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Link to='/admin'> <Button onClick={this.shoot} variant="primary" type="submit">
                                            Log In
                                    </Button> {''}</Link>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            </div>
        )
    }
}