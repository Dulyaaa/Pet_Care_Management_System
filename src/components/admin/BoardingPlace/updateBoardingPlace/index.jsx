import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Image } from 'react-bootstrap';
import BoardingPlaceService from '../../../../Services/BoardingPlacesService';
import pic from '../../../../assets/admin/shelter.png';

const initialState = {
    currentBoardingPlace: {
        placeId: "",
        placeImage: "",
        placeName: "",
        placeCity: "",
        placeEmail: "",
        placeOpeningHours: "",
        placeServices: []
    },
    formErrors: {},
    submitted: false,
    showHide: false
}

class UpdateBoardingPlace extends Component {
    constructor(props) {
        super(props);
        this.getBoardingPlace = this.getBoardingPlace.bind(this);
        this.onChangePlaceImage = this.onChangePlaceImage.bind(this);
        this.onchangePlaceName = this.onchangePlaceName.bind(this);
        this.onchangePlaceCity = this.onchangePlaceCity.bind(this);
        this.onchangePlaceEmail = this.onchangePlaceEmail.bind(this);
        this.onchangePlaceOpeningHours = this.onchangePlaceOpeningHours.bind(this);
        this.onchangeServiceDetails = this.onchangeServiceDetails.bind(this);
        this.updateBoardingPlace = this.updateBoardingPlace.bind(this);
        this.handleFormValidation = this.handleFormValidation.bind(this); 
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        this.getBoardingPlace(this.props.match.params.id);
    }

    getBoardingPlace(id) {
        BoardingPlaceService.get(id)
            .then(response => {
                this.setState({
                    currentBoardingPlace: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    // submitted: false
                });
            });
    }

    onChangePlaceImage(e) {
        const placeImage = e.target.value;

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeImage: placeImage
            }
        }));
    }

    onchangePlaceName(e) {

        console.log("changing", e);
        const placeName = e.target.value;

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeName: placeName
            }
        }));

        console.log("after change", this.state.currentBoardingPlace);
    }

    onchangePlaceCity(e) {
        const placeCity = e.target.value;

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeCity: placeCity
            }
        }));
    }

    onchangePlaceEmail(e) {
        const placeEmail = e.target.value;

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeEmail: placeEmail
            }
        }));
    }

    onchangePlaceOpeningHours(e) {
        const placeOpeningHours = e.target.value;

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeOpeningHours: placeOpeningHours
            }
        }));
    }

    onchangeServiceDetails = (e, item) => {
        console.log("changing service details", e.target.value, item);
        const placeServicePrice = e.target.value;
        const services = this.state.currentBoardingPlace.placeServices.map(service => (
            service.value === item.value ? { ...service, price: placeServicePrice } : service
        ))

        this.setState(prevState => ({
            currentBoardingPlace: {
                ...prevState.currentBoardingPlace,
                placeServices: services
            }
        }));

        console.log("after change", this.state.currentBoardingPlace.placeServices);
    }

    updateBoardingPlace() {
        if (this.handleFormValidation()) {
            BoardingPlaceService.update(
                this.state.currentBoardingPlace.placeId,
                this.state.currentBoardingPlace
            )
                .then(response => {
                    alert("success");
                    console.log(response.data);
                    this.setState({
                        submitted: true,
                    });
                })
                .catch(e => {
                    console.log(e);
                    this.setState({
                        submitted: false,
                    });
                });
        }
    }

    handleFormValidation() {
        const { currentBoardingPlace } = this.state;

        let formErrors = {};
        let formIsValid = true;

        let letters_only_pattern = /^[a-zA-Z]+$/;

        if (!currentBoardingPlace.placeImage) {
            formIsValid = false;
            formErrors["placeImageError"] = "*Pet Boarding Place Image URL is required.";
        }

        if (!currentBoardingPlace.placeName) {
            formIsValid = false;
            formErrors["placeNameError"] = "*Pet Boarding Place Name is required.";
        }

        if (!currentBoardingPlace.placeCity) {
            formIsValid = false;
            formErrors["placeCityError"] = "*Pet Boarding Place City Name is required.";
        } else {
            if (!letters_only_pattern.test(currentBoardingPlace.placeCity)) {
                formIsValid = false;
                formErrors["placeCityError"] = "*Please Enter Letters Only.";
            }
        }

        if (!currentBoardingPlace.placeEmail) {
            formIsValid = false;
            formErrors["placeEmailError"] = "*Pet Boarding Place Email is required.";
        }
        else {
            var pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
            if (!pattern.test(currentBoardingPlace.placeEmail)) {
                formIsValid = false;
                formErrors["placeEmailError"] = "*Please enter validate format of email."
            }
        }

        if (!currentBoardingPlace.placeOpeningHours) {
            formIsValid = false;
            formErrors["placeOpeningHoursError"] = "*Pet Boarding Place Opening Hours are required.";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    render() {
        const { placeImageError, placeNameError, placeCityError, placeEmailError, placeOpeningHoursError } = this.state.formErrors;
        const { currentBoardingPlace } = this.state;

        return (
            <div className="container">
                <div class="text-center">
                    <h1 class="head-title">UPDATE PET BOARDING PLACE</h1>
                </div>
                <Card style={{ width: '100%', marginTop: "5%", marginBottom: "5%" }}>
                    <Card.Body>
                        <Row>
                            <Col>
                                <div className="submit-form" style={{ width: 500, textAlign: "left", color: "grey", marginTop: "2%", marginLeft: "7%" }}>
                                    {this.state.submitted ? (
                                        <div style={{ marginTop: "40%", textAlign: "center", color: "darkorchid" }}>
                                            <h4>Pet Boarding Place Updated Successfully.!!</h4>
                                            <br />
                                            <a href="/admin-boarding-place"> <button className="btn btn-secondary">Add New Place</button></a>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a href="/admin-boarding-place"><button className="btn btn-warning">Go Back</button></a>
                                        </div>
                                    ) : (
                                        <div>
                                            {currentBoardingPlace ? (
                                                <form>
                                                    {/* Pet Boarding Place Image */}
                                                    <div className="form-group">
                                                        <label htmlFor="placeImage">Pet Boarding Place Image</label>
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            id="placeImage"
                                                            required
                                                            value={currentBoardingPlace.placeImage}
                                                            onChange={this.onChangePlaceImage}
                                                            name="placeImage"
                                                        />
                                                        {/* Pet Boarding Place Image error */}
                                                        <div className="">
                                                            {placeImageError &&
                                                                <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeImageError}</div>}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {/* Pet Boarding Place Name */}
                                                    <div className="form-group">
                                                        <label htmlFor="placeName" >Pet Boarding Place Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="placeName"
                                                            required
                                                            value={currentBoardingPlace.placeName}
                                                            onChange={this.onchangePlaceName}
                                                            name="placeName"
                                                        />
                                                        {/* Pet Boarding Place Name error */}
                                                        <div className="">
                                                            {placeNameError &&
                                                                <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeNameError}</div>}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {/* Pet Boarding Place City Name */}
                                                    <div className="form-group">
                                                        <label htmlFor="placeCity">Pet Boarding Place City Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="placeCity"
                                                            required
                                                            value={currentBoardingPlace.placeCity}
                                                            onChange={this.onchangePlaceCity}
                                                            name="placeCity"
                                                        />
                                                        {/* Pet Boarding Place City Name error */}
                                                        <div className="">
                                                            {placeCityError &&
                                                                <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeCityError}</div>}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {/* Pet Boarding Place Email */}
                                                    <div className="form-group">
                                                        <label htmlFor="placeEmail">Pet Boarding Place Email</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="placeEmail"
                                                            required
                                                            value={currentBoardingPlace.placeEmail}
                                                            onChange={this.onchangePlaceEmail}
                                                            name="placeEmail"
                                                        />
                                                        {/* Pet Boarding Place Email error */}
                                                        <div className="">
                                                            {placeEmailError &&
                                                                <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeEmailError}</div>}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {/* Pet Boarding Place Opening Hours */}
                                                    <div className="form-group">
                                                        <label htmlFor="placeOpeningHours">Pet Boarding Place Opening Hours</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="placeOpeningHours"
                                                            required
                                                            value={currentBoardingPlace.placeOpeningHours}
                                                            onChange={this.onchangePlaceOpeningHours}
                                                            name="placeOpeningHours"
                                                        />
                                                        {/* Pet Boarding Place Opening Hours error */}
                                                        <div className="">
                                                            {placeOpeningHoursError &&
                                                                <div style={{ color: "red", paddingBottom: 10, paddingTop: 3 }}>{placeOpeningHoursError}</div>}
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {currentBoardingPlace.placeServices ? currentBoardingPlace.placeServices.map((item, index) => (
                                                        <Row key={index}>
                                                            {/* Pet Boarding Place Each Services */}
                                                            <Col>
                                                                <div className="form-group">
                                                                    <label htmlFor="serviceName">Service</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="serviceName"
                                                                        value={item.label}
                                                                        name="serviceName"
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </Col>
                                                            {/* Pet Boarding Place Each Service Price */}
                                                            <Col>
                                                                <div className="form-group">
                                                                    <label htmlFor="servicePrice">Service Price in LKR (Per Pet)</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="id"
                                                                        required
                                                                        value={item.price}
                                                                        name="servicePrice"
                                                                        onChange={e => this.onchangeServiceDetails(e, item)}
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    )) :
                                                        <h1>No services</h1>}
                                                    <br />
                                                    <Row style={{ marginLeft: "25%" }}>
                                                        <Col>
                                                            <button className="btn btn-primary" onClick={this.updateBoardingPlace} style={{ width: 100 }}>Update</button>
                                                        </Col>
                                                        <Col style={{ marginLeft: -100 }}>
                                                            <Link to='/admin-boarding-place'>  <button className="btn btn-danger" style={{ width: 100 }}>Go Back</button></Link>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            ) : (
                                                <div>
                                                    <br />
                                                    <p>Please Select the Boarding Place to Update!!!</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Col>
                            <Col>
                                <Image src={pic} thumbnail style={{ border: "none" }} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

export default UpdateBoardingPlace;