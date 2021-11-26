import React, { Component } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import Select from 'react-select';
import BoardingPlaceService from '../../../../Services/BoardingPlacesService';
import pic from '../../../../assets/admin/shelter.png';

const initialState = {
    placeImage: "",
    placeName: "",
    placeCity: "",
    placeEmail: "",
    placeOpeningHours: "",
    selectedServices: [],
    serviceDetails: [],
    submitted: false,
    formErrors: {}
}

class NewBoardingPlace extends Component {
    constructor(props) {
        super(props);
        this.onChangePlaceImage = this.onChangePlaceImage.bind(this);
        this.onchangePlaceName = this.onchangePlaceName.bind(this);
        this.onchangePlaceCity = this.onchangePlaceCity.bind(this);
        this.onchangePlaceEmail = this.onchangePlaceEmail.bind(this);
        this.onchangePlaceOpeningHours = this.onchangePlaceOpeningHours.bind(this);
        this.onchangeSelectedServices = this.onchangeSelectedServices.bind(this);
        this.onchangeServiceDetails = this.onchangeServiceDetails.bind(this);
        this.saveBoardingPlace = this.saveBoardingPlace.bind(this);
        this.newBoardingPlace = this.newBoardingPlace.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this);
        this.state = initialState;
    }

    onChangePlaceImage = (e) => {
        this.setState({ placeImage: e.target.value });
    }

    onchangePlaceName = (e) => {
        this.setState({ placeName: e.target.value });
    }

    onchangePlaceCity = (e) => {
        this.setState({ placeCity: e.target.value });
    }

    onchangePlaceEmail = (e) => {
        this.setState({ placeEmail: e.target.value });
    }

    onchangePlaceOpeningHours = (e) => {
        this.setState({ placeOpeningHours: e.target.value });
    }

    onchangeSelectedServices = (e) => {
        this.setState({ selectedServices: e ? e.map(item => item) : [] });
    }

    onchangeServiceDetails = (e, item) => {
        var prices = Object.assign([], this.state.serviceDetails);
        const newService = {
            value: item.value,
            label: item.label,
            price: e.target.value
        }
        prices[item.id] = newService;
        this.setState({ serviceDetails: prices });
    }

    saveBoardingPlace = (e) => {
        e.preventDefault();
        if (this.handleFormValidation()) {
            var data = {
                placeImage: this.state.placeImage,
                placeName: this.state.placeName,
                placeCity: this.state.placeCity,
                placeEmail: this.state.placeEmail,
                placeOpeningHours: this.state.placeOpeningHours,
                placeServices: this.state.serviceDetails
            };
            BoardingPlaceService.create(data)
                .then(response => {
                    this.setState({
                        submitted: true
                    });
                    // alert('Data successfully entered.');
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    newBoardingPlace = () => {
        this.setState({
            placeImage: "",
            placeName: "",
            placeCity: "",
            placeEmail: "",
            placeOpeningHours: "",
            selectedServices: [],
            serviceDetails: [],
            submitted: false,
            formErrors: {}
        });
    }

    handleFormValidation() {
        const { placeImage, placeName, placeCity, placeEmail, placeOpeningHours, selectedServices } = this.state;

        let formErrors = {};
        let formIsValid = true;

        let letters_only_pattern = /^[a-zA-Z]+$/;

        if (!placeImage) {
            formIsValid = false;
            formErrors["placeImageError"] = "*Pet Boarding Place Image URL is required.";
        }

        if (!placeName) {
            formIsValid = false;
            formErrors["placeNameError"] = "*Pet Boarding Place Name is required.";
        }

        if (!placeCity) {
            formIsValid = false;
            formErrors["placeCityError"] = "*Pet Boarding Place City Name is required.";
        } else {
            if (!letters_only_pattern.test(placeCity)) {
                formIsValid = false;
                formErrors["placeCityError"] = "*Please Enter Letters Only.";
            }
        }

        if (!placeEmail) {
            formIsValid = false;
            formErrors["placeEmailError"] = "*Pet Boarding Place Email is required.";
        }
        else {
            var pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            if (!pattern.test(placeEmail)) {
                formIsValid = false;
                formErrors["placeEmailError"] = "*Please enter validate format of email."
            }
        }

        if (!placeOpeningHours) {
            formIsValid = false;
            formErrors["placeOpeningHoursError"] = "*Pet Boarding Place Opening Hours are required.";
        }

        if (!selectedServices.length > 0) {
            formIsValid = false;
            formErrors["selectedServicesError"] = "*Pet Boarding Place Services are required.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid
    }

    render() {
        const { placeImageError, placeNameError, placeCityError, placeEmailError, placeOpeningHoursError, selectedServicesError } = this.state.formErrors;
        const services = [
            { id: "0", value: 'stays', label: 'Overnight & Extended Stays' },
            { id: "1", value: 'daycare', label: 'Daycare' },
            { id: "2", value: 'grooming', label: 'Grooming' },
        ];

        return (
            <div className="container">
                <div class="text-center">
                    <h1 class="head-title">ADD NEW PET BOARDING PLACE</h1>
                </div>
                <Card style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Image src={pic} thumbnail style={{ border: "none" }} />
                            </Col>
                            <Col>
                                <div className="submit-form" style={{ width: 500, textAlign: "left", color: "grey", marginTop: "2%", marginLeft: "7%" }}>
                                    {this.state.submitted ? (
                                        <div style={{ marginTop: "40%", textAlign: "center", color: "darkorchid" }}>
                                            <h4>New Boarding Place Created Successfully.!!</h4>
                                            <br />
                                            <button className="btn btn-secondary" onClick={this.newBoardingPlace}>Add New Place</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a href="/admin-boarding-place"><button className="btn btn-warning">Go Back</button></a>
                                        </div>
                                    ) : (
                                        <div>
                                            <form>
                                                {/* Pet Boarding Place Image */}
                                                <div className="form-group">
                                                    <label htmlFor="placeImage">Pet Boarding Place Image</label>
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        id="placeImage"
                                                        required
                                                        value={this.state.placeImage}
                                                        onChange={this.onChangePlaceImage}
                                                        name="placeImage"
                                                    />
                                                    {/* Pet Boarding Place Image error */}
                                                    <div className="">
                                                        {placeImageError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeImageError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Name */}
                                                <div className="form-group">
                                                    <label htmlFor="placeName" >Pet Boarding Place Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="placeName"
                                                        required
                                                        value={this.state.placeName}
                                                        onChange={this.onchangePlaceName}
                                                        name="placeName"
                                                    />
                                                    {/* Pet Boarding Place Name error */}
                                                    <div className="">
                                                        {placeNameError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeNameError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place City Name */}
                                                <div className="form-group">
                                                    <label htmlFor="placeCity">Pet Boarding Place City Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="placeCity"
                                                        required
                                                        value={this.state.placeCity}
                                                        onChange={this.onchangePlaceCity}
                                                        name="placeCity"
                                                    />
                                                    {/* Pet Boarding Place City Name error */}
                                                    <div className="">
                                                        {placeCityError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeCityError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Email */}
                                                <div className="form-group">
                                                    <label htmlFor="placeEmail">Pet Boarding Place Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="placeEmail"
                                                        required
                                                        value={this.state.placeEmail}
                                                        onChange={this.onchangePlaceEmail}
                                                        name="placeEmail"
                                                    />
                                                    {/* Pet Boarding Place Email error */}
                                                    <div className="">
                                                        {placeEmailError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeEmailError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Opening Hours */}
                                                <div className="form-group">
                                                    <label htmlFor="placeOpeningHours">Pet Boarding Place Opening Hours</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="placeOpeningHours"
                                                        required
                                                        value={this.state.placeOpeningHours}
                                                        onChange={this.onchangePlaceOpeningHours}
                                                        name="placeOpeningHours"
                                                    />
                                                    {/* Pet Boarding Place Opening Hours error */}
                                                    <div className="">
                                                        {placeOpeningHoursError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeOpeningHoursError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Services */}
                                                <div className="form-group">
                                                    <label htmlFor="selectedServices">Pet Boarding Place Services</label>
                                                    <Select
                                                        options={services}
                                                        onChange={this.onchangeSelectedServices}
                                                        className="basic-multi-select"
                                                        isMulti
                                                    />
                                                    {/* Pet Boarding Place Services error */}
                                                    <div className="">
                                                        {selectedServicesError &&
                                                            <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{selectedServicesError}</div>}
                                                    </div>
                                                </div>
                                                {/* Pet Boarding Place Services */}
                                                {this.state.selectedServices.length > 0 ? this.state.selectedServices.map((item, index) => (
                                                    <Row key={index}>
                                                        {/* Pet Boarding Place Each Services */}
                                                        <Col>
                                                            <div className="form-group">
                                                                <label htmlFor="serviceName">Service</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="serviceName"
                                                                    required
                                                                    value={item.label}
                                                                    name="serviceName"
                                                                />
                                                            </div>
                                                        </Col>
                                                        {/* Pet Boarding Place Each Service Price */}
                                                        <Col>
                                                            <div className="form-group">
                                                                <label htmlFor="servicePrice">Service Price in LKR (Per Pet)</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    id={item.id}
                                                                    required
                                                                    value={this.state.servicePrice}
                                                                    onChange={e => this.onchangeServiceDetails(e, item)}
                                                                    name="servicePrice"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                                ) : ""
                                                }
                                                <br />
                                                <Row style={{ marginLeft: "25%" }}>
                                                    <button className="btn btn-success" onClick={this.saveBoardingPlace} style={{ width: 100 }}>Save</button>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button className="btn btn-danger" onClick={this.newBoardingPlace} style={{ width: 100 }}>Clear</button>
                                                </Row>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default NewBoardingPlace;