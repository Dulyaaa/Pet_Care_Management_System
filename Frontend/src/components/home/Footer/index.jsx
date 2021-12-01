import React, { Component } from 'react';
import './index.css';

export default class Footer extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <footer class="footer-section">
                <div style={{ paddingLeft: "3cm", paddingRight: "3cm" }}>
                    <div class="footer-content pt-5 pb-5">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 mb-5">
                                <div class="footer-widget">
                                    <div class="footer-logo">
                                        {/* <a href="/"><img
                                            src={logo}
                                            class="img-fluid"
                                            alt="logo"
                                            height="80"
                                            width="130"
                                        /></a> */}
                                    </div>
                                    <div class="footer-text">
                                        <p>
                                            Welcome to pet system. We're help you to
                                            find pet accessories, Veternaries and boarding places for your pet.
                                        </p>
                                    </div>
                                </div>
                            </div >
                            <div class="col-xl-4 col-lg-4 col-md-6 mb-30" style={{ marginLeft: 300, marginTop: 50 }}>
                                <div class="footer-widget">
                                    <div class="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><a href="https://facebook.com">Facebook</a></li>
                                        <li><a href="http://twitter.com" target="_blank">Twitter</a> </li>
                                        <li> <a target="_blank" href="https://youtube.com">Youtube</a> </li>
                                        <li> <a href="https://github.com">Github</a></li>
                                        <li><a href="https://instagram.com" target="_blank">Instagram</a > </li>
                                    </ul >
                                </div >
                            </div >
                        </div >
                    </div >
                </div >
                <div class="copyright-area">
                    <div style={{ paddingLeft: "3cm", paddingRight: "3cm" }}>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                                <div class="copyright-text">
                                    <p>
                                        Copyright &copy; 2021 | All Rights Reserved
                                        <a href="/"> Pet Care</a>
                                    </p>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                <div class="footer-menu">
                                    <ul>
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/keynotes">Pet Accessory</a></li>
                                        <li><a href="/conference">Pet Details</a></li>
                                        <li><a href="/past-proceedings">Veternary</a></li>
                                        <li><a href="/contact">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >

        );
    }
}