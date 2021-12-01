import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/doggy.jpg';
import { Card, Button, Col, Row } from 'react-bootstrap';

class MainSection extends Component {

    render() {

        return (
            <div >
                <Card className=" text-white" >
                    <Card.Img src={banner} alt="Card image" className="logo" />
                    <Card.ImgOverlay>
                        <Row>
                            <Col>
                                <Card.Text style={{ fontFamily: "monospace", fontWeight: 'bolder', fontSize: 40, paddingTop: 60, paddingLeft: 50, textAlign: 'left' }}>Find The Right</Card.Text>
                                <Card.Title style={{ fontSize: 70, fontWeight: 'bolder', textAlign: 'left', paddingTop: 20, paddingLeft: 50, color: "black" }}>Pet For You...</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <Card.Title style={{ fontSize: 25, fontFamily: "monospace", fontWeight: 'bolder', textAlign: 'left', paddingTop: 50, paddingLeft: 50, paddingBottom: 50 }}>
                                    " It is rewarding beyond words to rescue a pet from the shelter and have that pet become part of your family. "
                                </Card.Title>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Card.Text style={{ paddingLeft: 100, fontSize: 25, textAlign: 'left', marginTop: "4%" }}>
                            <Link to='/log-in'> <Button variant="secondary" style={{ fontFamily: "cursive", fontSize: 20, width: 150, paddingRight: 10, borderRadius: 20 }}>Log In</Button>{' '}</Link>
                        </Card.Text>
                    </Card.ImgOverlay>
                </Card>
            </div>
        );
    }
}

export default MainSection;