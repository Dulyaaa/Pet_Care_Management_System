import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import BoardingPlaceService from '../../../../Services/BoardingPlacesService';
import { RiFileDownloadLine } from 'react-icons/ri';
import './index.css'

export default class GenerateReport extends Component {
    constructor(props) {
        super(props);
        this.retrievePetBoardingPlaces = this.retrievePetBoardingPlaces.bind(this);
        this.onChangeSearchPlace = this.onChangeSearchPlace.bind(this);
        this.searchPetBoardingPlace = this.searchPetBoardingPlace.bind(this);
        this.exportPDF = this.exportPDF.bind(this);
        this.state = {
            boardingPlaces: [],
            searchPlace: "",
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


    exportPDF = () => {
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const title = "Pet Boarding Places City Starting in " + `${this.state.searchPlace}`;
        const headers = [["Place Image URL", "Place Name", "Place City", "Place Email", "Place Opening Hours", "Services"]];
        const place = this.state.boardingPlaces.map(
            places => [
                places.placeImage,
                places.placeName,
                places.placeCity,
                places.placeEmail,
                places.placeOpeningHours,
                places.placeServices.map(
                    services => [
                        services.label,
                        services.price]
                )
            ]
        );

        let content = {
            // theme:
            theme: 'grid',
            headStyles: { font: 'helvetica', fontStyle: 'bold', halign: 'center' },
            bodyStyles: { halign: 'center' },
            startY: 50,
            head: headers,
            body: place
        };
        doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Pet Boarding Place in " + `${this.state.searchPlace}` + ".pdf");
    }


    render() {
        const { searchPlace } = this.state;

        return (
            <div className="container" style={{ marginBottom: "5%" }}>
                <Row>
                    <div class="text-center">
                        <h1 class="head-title">Generate Report For Pet Boarding Places</h1>
                    </div>
                    {/* Search bar and search button */}
                    <div className="col-md-4" style={{ marginTop: "5%" }}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search By City"
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
                    {/* Download button */}
                    <div className="col-md-4" style={{ marginTop: "5%" }}>
                        <div className="input-group mb-3">
                            <a href="/generate-report-boarding-place">
                                <button class="member-btn btn" onClick={() => this.exportPDF()}><i><RiFileDownloadLine size="25" /></i> Download</button>
                            </a>
                        </div>
                    </div>
                </Row>
                {/* Table */}
                <div class="table-box">
                    {/* Table Header Start */}
                    <div class="table-row table-head">
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
                            <p>Opening Hours</p>
                        </div>
                        <div class="table-cell">
                            <p>Services</p>
                        </div>
                    </div>
                    {/* Table Header End */}
                    {/* Table Data Row Start */}
                    {this.state.boardingPlaces.map(
                        places =>
                            <div class="table-row">
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
                            </div>
                    )}
                    {/* Table Data Row End */}
                </div>
            </div>
        )
    }
}