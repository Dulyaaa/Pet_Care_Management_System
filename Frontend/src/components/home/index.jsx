import React, { Component } from 'react';
import { Button,Carousel } from 'react-bootstrap';
import Dog from '../../assets/dogs.jpg';
import PetAcc from '../../assets/petaccessories.png';
import Vet from '../../assets/vet.jpg';
import Kennel from '../../assets/kennel.jpg';
import MainSection from './MainSection';
import NewHome from './newMain.jsx';

export default class Home extends Component {
    render() {
        return (
            <div className="maincontainer">
                <NewHome />
                <div id='adopt'>
                    <div>
                        <br/>
                        <div className='row' style={{marginLeft:40}}>
                            <div className='col-xs-12 col-md-6'>
                    
                                <div className='adopt-text' style={{marginLeft:80}}>
                                    <h2>Look for Dogs</h2>
                                    <p>Pets are humanizing. They remind us we have an obligation and
                                        responsibility to preserve and nurture and care for all life.
                                    </p>
                                </div>
                                <a href="/display-pet">
                                <Button style={{ fontSize: 20, width: 150, paddingRight: 10, marginLeft:90, borderRadius: 20, backgroundColor: "#6372ff" }}>Click Here</Button>{' '}
                            </a>
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <img src={Dog} className='img-responsive' style={{ height: 200, width: 300, marginLeft:30 }} alt='logo' />
                            </div>
                        </div>
                        <br />
                        <div className='row' style={{marginLeft:40}}>
                            <div className='col-xs-12 col-md-6'>
                                <div className='adopt-text' style={{marginLeft:80}}>
                                    <h2>Pet Accessory</h2>
                                    <p>Go ahead and spoil your furry friends with unique pet accessories, from adorable pet pillows and blankets they can snuggle up with every day to custom dog bowls, food mats, treat jars and other pet necessities.
                                    </p>
                                </div>
                                <Button style={{ fontSize: 20, width: 150, paddingRight: 10, marginLeft:90, borderRadius: 20, backgroundColor: "#6372ff" }}>Click Here</Button>{' '}
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <img src={PetAcc} className='img-responsive' style={{ height: 200, width: 300, marginLeft:30 }} alt='logo' />
                            </div>
                        </div>
                        <br />
                        <div className='row' style={{marginLeft:40}}>
                            <div className='col-xs-12 col-md-6'>
                                <div className='adopt-text' style={{marginLeft:80}}>
                                <h2>Look For Veternaries</h2>
                                    <p>Your veterinarian is the best source of health advice for an individual pet.
                                    </p>
                                </div>
                                <a href="/display-veterinary-details">
                                <Button style={{ fontSize: 20, width: 150, paddingRight: 10, marginLeft:90, borderRadius: 20, backgroundColor: "#6372ff" }}>Click Here</Button>{' '}
                                </a>
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <img src={Vet} className='img-responsive' style={{ height: 200, width: 300, marginLeft:30 }} alt='logo' />
                            </div>
                        </div>
                        <br />
                        <div className='row' style={{marginLeft:40}}>
                            <div className='col-xs-12 col-md-6'>
                                <div className='adopt-text' style={{marginLeft:80}}>
                                <h2>Search For Boarding Places</h2>
                                    <p>Boarding your dog at a familiar place with familiar faces and smells will make a difference in how they feel being away from you.
                                    </p>
                                </div>
                                <a href="/boarding-place">
                                <Button style={{ fontSize: 20, width: 150, paddingRight: 10, marginLeft:90, borderRadius: 20, backgroundColor: "#6372ff" }}>Click Here</Button>{' '}
                                </a>
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <img src={Kennel} className='img-responsive' style={{ height: 200, width: 300, marginLeft:30 }} alt='logo' />
                            </div>
                        </div>

                    </div>
                </div>
               
            </div>
        );
    }
}