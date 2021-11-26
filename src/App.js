import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from './components/home/Footer';
import NavBar from './components/home/NavBar';
import Home from './components/home';
import ContactUs from './components/ContactUs';
import LogIn from './components/admin/AdminLogin';
import Admin from './components/admin';
import BoardingPlaceAdmin from './components/admin/BoardingPlace';
import NewBoardingPlace from './components/admin/BoardingPlace/insertBoardingPlace';
import UpdateBoardingPlace from './components/admin/BoardingPlace/updateBoardingPlace';
import GenerateReportBoardingPlace from './components/admin/BoardingPlace/generateReport';
import BoardingPlace from './components/User/DisplayBoardingPlace';
import PetAccessory from './components/admin/PetAccessory';
import newAccessory from './components/admin/PetAccessory/newAccessory';
import GenerateReport from './components/admin/PetAccessory/generateReport';
import updateAccessory from './components/admin/PetAccessory/updateAccessory';
import DisplayAccessory from './components/User/DisplayAccessory';
import InsertPet from './components/admin/PetDetails/InsertPet';
import VeterinaryService from './components/admin/VeterinaryServices';
import InsertVeterinay from './components/admin/VeterinaryServices/InsertVeterinaryDetails';
import VetGenerateReport from './components/admin/VeterinaryServices/ReportGenerate';
import UpdateVeterinay from './components/admin/VeterinaryServices/UpdateVeterinaryDetails';
import VetDetails from './components/User/DisplayVeterinary';
import './App.css';
import DisplayPet from './components/User/DisplayPet';
import Petreport from './components/admin/PetDetails/generateReport';
import PetDetails from './components/admin/PetDetails';
import UpdatePet from './components/admin/PetDetails/UpdatePet';
import Index from './components/User/DisplayPet/DisplayContactdet';

export default class App extends Component {
  render() {
    return (
      <div className='body' style={{backgroundColor : '#ddddff'}} >
         <NavBar/>
        <BrowserRouter>
          <Switch>
            {/* Main Pages Related Paths */}
            <Route exact path='/' component={Home} />
            <Route exact path='/contact-us' component={ContactUs} />
            <Route exact path='/admin-login' component={LogIn} />
            <Route exact path='/admin' component={Admin} />
            {/* Boarding Place Related Paths */}
            <Route exact path='/admin-boarding-place' component={BoardingPlaceAdmin} />
            <Route exact path='/new-boarding-place' component={NewBoardingPlace} />
            <Route exact path='/update-boarding-place/:id' component={UpdateBoardingPlace} />
            <Route exact path='/generate-report-boarding-place' component={GenerateReportBoardingPlace} />
            <Route exact path='/boarding-place' component={BoardingPlace} />
            {/* Pet Accessories Related Paths */}
            <Route exact path='/admin-accessory' component={PetAccessory} />
            <Route exact path='/new-accessory' component={newAccessory} />
            <Route exact path='/generate-report-accessory' component={GenerateReport} />
            <Route exact path='/display-accessory' component={DisplayAccessory} />
            <Route exact path='/update-accessory/:id' component={updateAccessory} />
            {/* Pet Details Related Paths */}
            <Route exact path='/admin-insert-pet' component={InsertPet} />
            <Route exact path='/display-pet' component={DisplayPet} />
            <Route exact path='/generate-reprt-pet' component={Petreport} />
            <Route exact path='/get-pet-details' component={PetDetails} />
            <Route exact path='/update-pet-details/:id' component={UpdatePet} />
            <Route exact path='/display-Contact/:id' component={Index}></Route>
            {/* Pet Veterinary Services Related Paths */}
            <Route exact path='/admin-veterinary-services' component={VeterinaryService} />
            <Route exact path='/new-veterinary-details' component={InsertVeterinay} />
            <Route exact path='/generate-report-veterinary-details' component={VetGenerateReport} />
            <Route exact path='/update-veterinary-details/:id' component={UpdateVeterinay} />
            <Route exact path='/display-veterinary-details' component={VetDetails} />
          </Switch>
        </BrowserRouter>
        <br />
        <Footer />
      </div>
    )
  }
}