
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import AccessoryService from '../../../../Services/AccessoryService';
import './index.css'
import jsPDF from 'jspdf';
import "jspdf-autotable";
import { RiFileDownloadLine } from 'react-icons/ri';
import { MdCancel } from 'react-icons/md';

export default class GenerateReport extends Component {
    constructor(props) {
        super(props);
        this.retrievePetAccessory = this.retrievePetAccessory.bind(this);
        this.onChangeSearchItem = this.onChangeSearchItem.bind(this);
        this.searchPetAccessory = this.searchPetAccessory.bind(this);
        this.state = {
        accessorydetails: [],
        searchItem: ""
    }
    }
    componentDidMount() {
        this.retrievePetAccessory();

    }

    onChangeSearchItem(e) {
        const searchItem = e.target.value;

        this.setState({
            searchItem: searchItem
        });
    }
    retrievePetAccessory = () => {
        AccessoryService.getallAccessory().then(response => {
            this.setState({
                accessorydetails: response.data
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    }

    searchPetAccessory = () => {
        AccessoryService.findByName(this.state.searchItem)
            .then(response => {
                this.setState({
                    accessorydetails: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    exportPDF = () => {

        console.log( "SSSSSSSSSS" )
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );
        const title = "Pet Details ";
        const headers = [["Image URL","Item Name","Item Price","Description"]];
        const accessory =  this.state.accessorydetails.map(

            accessory=>[
                accessory.imageURL,
                accessory.itemName,
                accessory.itemPrice,
                accessory.description,

            ]

        );
        let content = {
            startY: 50,
            head: headers,
            body: accessory
        };

        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "Pet Accessory.pdf" )
    }

    render() {
        const { searchItem } = this.state;
        return (
            <div className="container">
                <Row>
                    <div class="text-center">
                        <h1 class="head-title">Generate Report For Pet Accessory</h1>
                    </div>

                    <div className="col-md-4" style={{ marginTop: "5%" }}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Item Name"
                                value={searchItem}
                                onChange={this.onChangeSearchItem}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={this.searchPetAccessory}
                                >
                                    Search
                                </button>
                                <i>
                                 <button class="btn btn-outline-primary"  style = {{marginLeft : "5px"}}
                                  onClick={this.cancel}><MdCancel  size="23"/></button>
                                </i>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row style={{ marginTop: "-1.5cm" }}>
                        <Col>
                        </Col>
                        <Col style={{ marginLeft: "35%" }}>
                                <button class="member-btn btn" onClick={() => this.exportPDF()}><i><RiFileDownloadLine size="25" /></i> Download</button>
                        </Col>
                    </Row>
                <div class="table-box">
                    {/* Table Header Start */}
                    <div class="table-row table-head">
                        <div class="table-cell first-cell">
                            <p>Item Image</p>
                        </div>
                        <div class="table-cell">
                            <p>Item Name</p>
                        </div>
                        <div class="table-cell">
                            <p>Price</p>
                        </div>
                        <div class="table-cell">
                            <p>Description</p>
                        </div>
                    </div>
                    {/* Table Header End */}
                    {/* Table Data Row Start */}
                    {this.state.accessorydetails.map(
                            accessory =>
                                <div class="table-row" key={accessory.id}>
                                    <div class="table-cell first-cell">
                                        <img
                                            alt="Not available"
                                            class="card-img-top"
                                            src={accessory.imageURL}
                                        />
                                    </div>
                                    <div class="table-cell">
                                        <p>{accessory.itemName}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>{accessory.itemPrice}</p>
                                    </div>
                                    <div class="table-cell">
                                        <p>{accessory.description}</p>
                                    </div>
                                   
                        
                    </div>
                   )}
                   </div>
            </div>
        )
    }
}