
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import BoardingPlaceService from '../../../Services/BoardingPlacesService';
import './index.css';

export default class BoardingPlace extends Component {
    constructor(props) {
        super(props);
        this.retrievePetBoardingPlaces = this.retrievePetBoardingPlaces.bind(this);
        this.onChangeSearchPlace = this.onChangeSearchPlace.bind(this);
        this.searchPetBoardingPlace = this.searchPetBoardingPlace.bind(this);
        this.state = {
            boardingPlaces: [],
            searchPlace: ""
        }
    }

    componentDidMount() {
        this.retrievePetBoardingPlaces();
    }

    onChangeSearchPlace(e) {
        const searchPlace = e.target.value;

        this.setState({
            searchPlace: searchPlace
        });
    }

    retrievePetBoardingPlaces = () => {
        BoardingPlaceService.getAll().then(response => {
            this.setState({
                boardingPlaces: response.data
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    searchPetBoardingPlace = () => {
        BoardingPlaceService.findByPlace(this.state.searchPlace)
            .then(response => {
                this.setState({
                    boardingPlaces: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchPlace } = this.state;

        return (
            <div className="container" style={{ marginBottom: "5%", marginTop:"2%" }}>
                <Row>
                    <div class="text-center">
                        <h1 class="head-title">PET BOARDING PLACES</h1>
                    </div>
                </Row>
                {/* Search bar & search button */}
                <Row>
                    <div className="col-md-4" style={{ marginTop: "3%", marginLeft: "65%" }}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search By Location"
                                value={searchPlace}
                                onChange={this.onChangeSearchPlace}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={this.searchPetBoardingPlace}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </Row>
                {this.state.boardingPlaces.map(
                    places =>
                        <section class="why-us section-bg auto-space auto-space-vertical"> 
                            <br />
                            <div class="container" key={places.placeId} style={{ backgroundColor: '#fff' }}>
                                <div class="row">
                                    <div class="col-lg-6 video-box">
                                        <img
                                            src={places.placeImage}
                                            class="img-fluid"
                                            alt="Not Available"
                                            style={{ objectFit: "cover", width: 600, height: 400 }}
                                        />
                                    </div>
                                    <div class="col-lg-6 d-flex flex-column">
                                        <div class="col-md-10 col-sm-12">
                                            <br />
                                            <h2 style={{ textAlign: "center", color: "#5a5af3" }}>{places.placeName}</h2>
                                            <h4 style={{ fontFamily: "revert", color: "InfoText" }}>Contact Details</h4>
                                            <ul>
                                                <Row>
                                                    <Col>
                                                        <h6 style={{ color: "CaptionText" }}>
                                                            City:
                                                        </h6>
                                                        <p style={{ color: "GrayText", fontFamily: "monospace" }}>
                                                            {places.placeCity}
                                                        </p>
                                                    </Col>
                                                    <Col>
                                                        <h6>
                                                            Email:
                                                        </h6>
                                                        <p style={{ color: "grey", fontFamily: "monospace" }}>
                                                            {places.placeEmail}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <h6>
                                                            Open Hours:
                                                        </h6>
                                                        <p style={{ color: "grey", fontFamily: "monospace" }}>
                                                            {places.placeOpeningHours}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </ul>
                                            <Row style={{ textAlign: "left" }}>
                                                <h4 style={{ fontFamily: "revert", color: "InfoText" }}>Services</h4>
                                                <p>
                                                    <ul>
                                                        {places.placeServices.map(
                                                            services =>
                                                                <li> <h6 style={{ fontFamily: "cursive" }}>{services.label} - <b><span style={{ fontFamily: "monospace" }}> LKR:{services.price}/=</span></b></h6></li>
                                                        )}
                                                    </ul>
                                                    <span class="text-color-primary">
                                                        *Prices will vary according to purpose and number of pets.
                                                    </span>
                                                </p>

                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                        </section>
                )}
            </div>
        )
    }
}