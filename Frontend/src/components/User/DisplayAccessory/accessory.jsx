import React, { Component } from 'react'
import './accessory.css'
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


export default class accessory extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }


    render() {
        return (
            <Card border="primary" style={{ color: "blue", width: '100%', marginTop: '-1cm' }} >

                <div className="product-tumb" style={{ marginTop: '0.5cm' }}>
                    <img width="200" height="200" src={this.props.accessory.imageURL} alt="" />
                </div>
                <div className="product-details" >
                    <span className="product-catagory"> <h5><b>{this.props.accessory.itemName}</b></h5></span>
               
                    <p>{this.props.accessory.description}</p>
                    <div className=" product-bottom-details">RS.{this.props.accessory.itemPrice}.00</div>
                   
                    <div className="product-bottom-details">

                        <div className="product-links">
                            <a href="#name"><i className="fa fa-heart" /></a>
                        </div>

                    </div>
                </div>
            </Card >
        )
    }
}
