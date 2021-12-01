import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import image from '../../assets/bg.png';

export default class Home extends Component {
    render() {
        return (
            <div className="maincontainer" style={{ backgroundColor: 'GrayText', padding: 50 }}>
                <Row>
                    <Col>
                        <div class="intro-img" data-aos="zoom-out" data-aos-delay="200">
                            <img src={image} alt="" class="img-fluid" />
                        </div>
                    </Col>
                    <Col>
                        <h1 style={{ fontWeight:'bolder', color: 'tomato', fontFamily: 'monospace', textAlign: 'center', padding: 30, marginTop: 70 }}>Only The Best For Your Dog!!!</h1>
                        <h4 style={{ color: '#fff', fontFamily: 'initial', textAlign: 'center', padding: 30, }}>“Dogs never talk about themselves but listen to you while you talk about yourself, and keep up an appearance of being interested in the conversation.”</h4>
                        <h5 style={{ color: '#fff', fontFamily: 'cursive', textAlign: 'center', }}> – Jerome K. Jerome</h5>
                    </Col>
                </Row>
            </div>
        )
    }
}