import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Image} from 'react-bootstrap';
import pet2 from '../../../../assets/admin/pet2.jpg';
import './index.css';
import AccessoryService from '../../../../Services/AccessoryService';

const initialState = {
    itemName : '',
    imageURL : ''  ,
    itemPrice : 0,
    description: '',
    //formErrors: {}
} 

export default class newAccessory extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //this.handleFormValidation = this.handleFormValidation.bind(this);
        this.state = initialState;
        this.state.show =false;   
        this.state = {
            errors: {},
            isLoaded: false,
            isPayareaHidden:true
        }
    }

    componentDidMount() {
        
    }
    // onSubmit(e) {
    //     e.preventDefault();
        
        
    // }
    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.validate()){
        let accessory = {
            itemName: this.state.itemName,
            imageURL: this.state.imageURL,
            itemPrice: this.state.itemPrice,
            description: this.state.description
        };
        console.log("DETAILS ADDED SUCCESSFUL ", accessory);
        AccessoryService.addPetAccessory(accessory).then(res =>{
            this.props.history.push('/admin-accessory')
            if(res.data != null){
                this.setState({"show":true});
                setTimeout(() => this.setState({"show" :false}) , 3000)

            }else{
                this.setState({"show" :false})
            }
        })
    }
    }
    clearData = () => {
        this.setState({
            itemName : '',
            imageURL : ''  ,
            itemPrice : 0,
            description: ''
        });
    }


    componentWillUnmount() {
        
    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() {}

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    // handleFormValidation() {
    //     const { itemName, imageURL, itemPrice, description } = this.state;

    //     let formErrors = {};
    //     let formIsValid = true;

    //     if (!imageURL) {
    //         formIsValid = false;
    //         formErrors["imageURLError"] = "*Accessory Image URL is required.";
    //     }

    //     if (!itemName) {
    //         formIsValid = false;
    //         formErrors["itemNameError"] = "*Accessory Name is required.";
    //     }

    //     if (!itemPrice) {
    //         formIsValid = false;
    //         formErrors["itemPriceError"] = "*Accessory Price is required.";
    //     }

    //     if (!description) {
    //         formIsValid = false;
    //         formErrors["descriptionError"] = "*Description is required.";
    //     }

    //     this.setState({ formErrors: formErrors });
    //     return formIsValid
    // }
    validate(){

        let errors = {};
        let isValid = true;
        if (!this.state.imageURL) {  
            isValid = false;
            errors["imageURL"] = "Please enter the image URL.";
          }
          if (!this.state.itemName) {  
            isValid = false;
            errors["itemName"] = "Please enter the item name.";
          }
        if (!this.state.itemPrice) {  
          isValid = false;
          errors["itemPrice"] = "Please enter the accessory price.";
        }
        
          if (!this.state.description) {  
            isValid = false;
            errors["description"] = "Please enter the description.";
          }
          
  
        this.setState({
          errors: errors
        });
        return isValid;
  
    }

    render() {

        // const { itemNameError, imageURLError, itemPriceError, descriptionError} = this.state.formErrors;
        return (
           
            <div>
            <div id='createaccessory' style= {{paddingLeft : "3cm" , paddingRight : "3cm"}}>
                <div className='section-title text-center'>
                    <h3> ADD PET Accessory</h3>
                </div>
                <Row className="landing">
                    <Col >
                        <Form onSubmit={this.onSubmit} style={{ width: "80%", marginLeft: "10%" }}>
                            <Form.Group >
                                <Form.Label>itemName</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="itemName"
                                    name="itemName"
                                    placeholder="Item Name"
                                    value={this.state.itemName}
                                    onChange={this.onChange} />
                                    {/* <div className="">
                                     {itemNameError &&
                                        <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{itemNameError}</div>}
                                    </div> */}
                                    <div className="text-danger">{this.state.errors.itemName}</div>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>imageURL</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="imageURL"
                                    name="imageURL"
                                    placeholder="ImageURL"
                                    value={this.state.imageURL}
                                    onChange={this.onChange} />
                                     {/* <div className="">
                                     {imageURLError &&
                                        <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{imageURLError}</div>}
                                    </div> */}
                                    <div className="text-danger">{this.state.errors.imageURL}</div>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>itemPrice</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="itemPrice"
                                    name="itemPrice"
                                    placeholder="Description"
                                    value={this.state.itemPrice}
                                    onChange={this.onChange} />
                                    {/* <div className="">
                                     {itemPriceError&&
                                        <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{itemPriceError}</div>}
                                    </div> */}
                                    <div className="text-danger">{this.state.errors.itemPrice}</div>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>description</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    value={this.state.description}
                                    onChange={this.onChange} />
                                     {/* <div className="">
                                     {descriptionError&&
                                        <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{descriptionError}</div>}
                                    </div> */}
                                    <div className="text-danger">{this.state.errors.description}</div>
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Button type="submit" style={{ paddingRight: 10 }}>Submit</Button> {''}
                                {/* <Link to='/'>  <Button type="back" style={{ backgroundColor: '#37474F', paddingRight: 10 }}>Clear</Button></Link> */}
                                <button className="btn btn-danger" onClick={this.clearData } style={{ width: 100 }}>Clear</button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col >
                        <Image src={pet2} thumbnail style={{ border: "none", width:"18cm" , marginTop:"-4cm"}} />
                    </Col>
                </Row>
            </div >
        </div >
        )
    }
}
