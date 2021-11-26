import React, { Component } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';
import { RiFileDownloadLine, RiDeleteBin2Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import BoardingPlaceService from '../../../Services/BoardingPlacesService';
import './index.css'

export default class BoardingPlace extends Component {
    constructor(props) {
        super(props);
        this.retrievePetBoardingPlaces = this.retrievePetBoardingPlaces.bind(this);
        this.deletePetBoardingPlace = this.deletePetBoardingPlace.bind(this);
        this.navigateUpdatePage = this.navigateUpdatePage.bind(this);
        this.setToast = this.setToast.bind(this);
        this.state = {
            boardingPlaces: [],
            message_show: false,
            message: ""
        }
    }

    componentDidMount() {
        this.retrievePetBoardingPlaces();
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

    deletePetBoardingPlace = (id) => {
        BoardingPlaceService.delete(id)
            .then(response => {
                this.setState({
                    boardingPlaces: this.state.boardingPlaces.filter(boardingPlace => boardingPlace.placeId !== id),
                    message_show: true,
                    message: "Successfully Deleted."
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
                this.setState({
                    message_show: true,
                    message: "Can't delete."
                });
            })
    }

    navigateUpdatePage(e, placeId) {
        console.log("Place ID:", placeId);
        window.location = `/update-boarding-place/${placeId}`
    }

    setToast = (key) => {
        this.setState({ message_show: key });
    }

    render() {
        return (
            <div className="container">
                <Row style={{ marginBottom: "5%" }}>
                    <div class="text-center">
                        <h1 class="head-title">PET BOARDING PLACE DETAILS</h1>
                    </div>
                    {/* Toaster Start */}
                    <Row>
                        <Col></Col>
                        <Col style={{ marginLeft: "70%" }} xs={6}>
                            <Toast onClose={() => this.setToast(false)} show={this.state.message_show} delay={3000} autohide>
                                <Toast.Body>{this.state.message}</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                    {/* Toaster End */}
                    <Row style={{ marginTop: "3%" }}>
                        <Col>
                        </Col>
                        <Col style={{ marginLeft: "35%" }}>
                            {/* Add new entry button */}
                            <a href="/new-boarding-place">
                                <button class="member-btn btn"><i><BsPlusCircle size="25" /></i> New Entry</button>
                            </a>
                            {/* Generate report button */}
                            <a href="/generate-report-boarding-place">
                                <button class="member-btn btn"><i><RiFileDownloadLine size="25" /></i> Download</button>
                            </a>
                        </Col>
                    </Row>
                    <div class="table-box">
                        {/* Table Header Start */}
                        <div class="table-row-place table-head">
                            <div class="table-cell first-cell">
                                <p>Boarding Place Image</p>
                            </div>
                            <div class="table-cell">
                                <p>Place Name</p>
                            </div>
                            <div class="table-cell">
                                <p>City</p>
                            </div>
                            <div class="table-cell">
                                <p>Email</p>
                            </div>
                            <div class="table-cell">
                                <p>Open Hours</p>
                            </div>
                            <div class="table-cell">
                                <p>Services (*Prices are per dog)</p>
                            </div>
                            <div class="table-cell">
                                <p>Actions</p>
                            </div>
                        </div>
                        {/* Table Header End */}
                        {/* Table Data Row Start */}
                        {this.state.boardingPlaces.map(
                            places =>
                                <div class="table-row-place" key={places.placeId}>
                                    <div class="table-cell first-cell">
                                        <img
                                            alt="Not available"
                                            class="card-img-top"
                                            src={places.placeImage}
                                        />
                                    </div>
                                    <div class="table-cell">
                                        <p>{places.placeName}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>{places.placeCity}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>{places.placeEmail}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>{places.placeOpeningHours}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>
                                            <ol>
                                                {places.placeServices.map(
                                                    services =>
                                                        <li>{services.label} - Rs.{services.price}/=</li>
                                                )}
                                            </ol>
                                        </p>
                                    </div>
                                    <div class="table-cell last-cell">
                                        <button style={{ backgroundColor: "white", border: "none" }}>
                                            <FiEdit
                                                onClick={e => this.navigateUpdatePage(e, places.placeId)}
                                                size={30}
                                                style={{ textAlign: "center", color: "blue", backgroundColor: "white" }} />
                                        </button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button style={{ backgroundColor: "white", border: "none" }}>
                                            <RiDeleteBin2Line
                                                onClick={() => this.deletePetBoardingPlace(places.placeId)}
                                                size={35}
                                                style={{ textAlign: "center", color: "red", backgroundColor: "white" }} />
                                        </button>
                                    </div>
                                </div>
                        )}
                        {/* Table Data Row End */}

                    </div>
                </Row>
            </div >
        )
    }
}