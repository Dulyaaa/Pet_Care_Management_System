import React, { Component } from 'react'
import Petitem from './accessory';
import AccessoryService from '../../../Services/AccessoryService';
import './index.css';
import { Row } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';


export default class DisplayAccessory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accessorydetails: [],
            itemName:""
        };
        this.onChangeAccessory = this.onChangeAccessory.bind(this);
        this.searchAccessoryFromName = this.searchAccessoryFromName.bind(this);
        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {
       this.retrieveAccessoryDetails();
    }

    retrieveAccessoryDetails = () => {
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
    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }
    onChangeAccessory(e) {
        const itemName = e.target.value;

        this.setState({
            itemName: itemName
        });
    }

    cancel = () =>{
        this.retrieveAccessoryDetails();
    }

    searchAccessoryFromName = () => {
        AccessoryService.findByName(this.state.itemName)
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

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }
 
    render() {
        const { itemName } = this.state;
        return (
            <div className="container" >
                <div className="col-md-8">
                    <div classname="col-md-8">
                        <div classname="input-group mb-3">
                        </div>
                    </div></div>
                    <Row>
                    <div class="text-center">
                        <h1 class="head-title">Pet Accessories Details</h1>
                    </div>
                </Row>
                {/* Search bar & search button */}
                <Row>
                    <div className="col-md-4" style={{ marginTop: "3%", marginLeft: "65%" }}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Accessory By Name"
                                value={itemName}
                                onChange={this.onChangeAccessory}
                            />&nbsp;
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={this.searchAccessoryFromName}
                                >
                                    Search
                                </button>&nbsp;
                                <i>
                                 <button class="btn btn-outline-primary" style = {{marginLeft : "5px"}}
                                  onClick={this.cancel}><MdCancel  size="24"/></button>
                                </i>
                            </div>
                        </div>
                    </div>
                </Row>
                <main className="grid" style={{ marginTop: '3cm' }}>
                    {
                        this.state.accessorydetails.map((accessory, key) => {

                            return <Petitem accessory={accessory} key={key} />
                        })
                    }
                </main>
            </div>

        )
    }
}
