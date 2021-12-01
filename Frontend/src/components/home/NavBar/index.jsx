import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../../../assets/logo.jpg';

export default class Navbarnew extends Component {
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
    handleEvent() {}

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
       
        return (
      
                <Navbar bg="light" variant="dark-gray"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar.Brand  href="/">
                <img
                src={logo}
                width="70"
                height="70"
                className="d-inline-block align-top" />
                </Navbar.Brand>
                <Nav id = "navbar" className="me-auto" style= {{fontSize:"20px" , width:"30cm"}}>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/display-pet">Pet Details</Nav.Link>
                <Nav.Link href="/display-accessory">Pet Accessories</Nav.Link>
                <Nav.Link href="/display-veterinary-details">Veterinary Services</Nav.Link>
                <Nav.Link href="/boarding-place">Pet Boarding Places</Nav.Link>
                <Nav.Link href="/contact-us">Contact Us  </Nav.Link>
                <Nav.Link href="/admin-login">Admin Login  </Nav.Link>
                </Nav>
    
                <Nav id = "navbar" className="me-auto" style= {{fontSize:"18px" , paddingLeft: "3cm"}}>
                {/* <Navbar.Brand href="/userprofile">
                <img 
                src="https://bootdey.com/img/Content/avatar/avatar7.png" 
                alt="Admin" className="rounded-circle" 
                width={50} />
                </Navbar.Brand> */}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
             )
        
            }
}
