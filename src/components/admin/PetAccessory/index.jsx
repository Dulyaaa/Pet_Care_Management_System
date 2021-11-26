
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
//import items from '../../../assets/admin/items.png';
import { BsPlusCircle } from 'react-icons/bs';
import { RiFileDownloadLine, RiDeleteBin2Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import './index.css'
import AccessoryService from '../../../Services/AccessoryService';

export default class PetAccessory extends Component {
    constructor(props) {
        super(props);
        this.retrieveAccessoryDet = this.retrieveAccessoryDet.bind(this); 
        this.navigateUpdatePage = this.navigateUpdatePage.bind(this);

        this.state = {
            accessorydetails: []
        }
    }

    componentDidMount() {
        this.retrieveAccessoryDet();
    }

    retrieveAccessoryDet = () => {
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

    deleteAccessoryDetails(e, accId){
        AccessoryService.deleteAccessory(accId)
        .then(response => {
            alert('Data successfully Deleted.');
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message);
        })
    }

    navigateUpdatePage(e, accId) {
        console.log("Accessory ID:", accId);
        window.location = `/update-accessory/${accId}`
    }

    render() {

        return (
            <div className="container">
                <Row>
                    <div class="text-center">
                        <h1 class="head-title">PET ACCESSORY DETAILS</h1>
                    </div>
                    <Row style={{ marginTop: "3%" }}>
                        <Col>
                        </Col>
                        <Col style={{ marginLeft: "35%" }}>
                            <a href="/new-accessory">
                                <button class="member-btn btn"><i><BsPlusCircle size="25" /></i> New Entry</button>
                            </a>

                            <a href="/generate-report-accessory">
                                <button class="member-btn btn"><i><RiFileDownloadLine size="25" /></i> Download</button>
                            </a>
                        </Col>
                    </Row>
                    <div class="table-box">
                        {/* Table Header Start */}
                        <div class="table-row table-head">
                            <div class="table-cell first-cell">
                                <p>Accessory Image</p>
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
                            <div class="table-cell">
                                <p>Actions</p>
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
                                   
                                    <div class="table-cell last-cell">
                                        <button style={{backgroundColor:"white", border:"none"}}>
                                            <FiEdit
                                                onClick={e => this.navigateUpdatePage(e, accessory.id)}
                                                size={30}
                                                style={{ textAlign: "center", color: "blue", backgroundColor: "white" }} />
                                        </button>&nbsp;&nbsp;&nbsp;
                                        <button style={{ backgroundColor: "white", border: "none" }}>
                                            <RiDeleteBin2Line
                                                onClick = {e => this.deleteAccessoryDetails(e , accessory.id)}
                                                size={35}
                                                style={{ textAlign: "center", color: "red", backgroundColor: "white" }} />
                                        </button>
                                    </div>
                                </div>
                                )}
                        {/* Table Data Row End */}
                    </div>
                </Row>
            </div>
        )
    }
}