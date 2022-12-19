import React, { Component } from 'react';
import DebugList from './DebugList';
import GuestList from './GuestList';
import StaffList from './StaffList';
import ServiceList from './ServiceList';
import AppointmentList from './AppointmentList';
import Stack from '@mui/material/Stack';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            testState: true,
            guests: [],
            loadingGuests: true,
            staffs: [],
            loadingStaffs: true,
            services: [],
            loadingServices: true
        };
    }

    
    

    componentDidMount() {
        this.populateGuestData();
        this.populateStaffData();
        this.populateServiceData();
    }
    

    async populateGuestData() {
        console.log('GuestList.populateGuestData()');
        const response = await fetch('api/guests');
        const data = await response.json();
        this.setState({ guests: data, loading: false });
    }

    async populateStaffData() {
        console.log("StaffList.populateStaffData()");
        const response = await fetch("api/staffs");
        const data = await response.json();
        this.setState({ staffs: data, loading: false });
    }

    async populateServiceData() {
        console.log("ServiceList.populateServiceData()");
        const response = await fetch("api/services");
        const data = await response.json();
        this.setState({ services: data, loading: false });
    }

    requeryGuestsListener = () => {
        console.log("App.requeryGuestListener()");
        this.populateGuestData();
    }

    requeryStaffsListener = () => {
        console.log("App.requeryStaffsListener()");
        this.populateStaffData();
    }

    requeryServicesListener = () => {
        console.log("App.requeryServiceListener()");
        this.populateServiceData();
    }

    render() {
        
        console.log("App.render()");
        console.log("Test state at render: " + this.state.testState)
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <GuestList
                        listeners={{ guestListener: this.requeryGuestsListener }}
                        overState={this.state.testState}
                        guests={this.state.guests}
                        loadingGuests={this.state.loadingGuests}
                    />
                    <StaffList
                        listeners={{ staffListener: this.requeryStaffsListener }}
                        staffs={this.state.staffs}
                        loadingStaffs={this.state.loadingStaffs}
                    />
                    <ServiceList
                        listeners={{ serviceListener: this.requeryServicesListener }}
                        services={this.state.services}
                        loadingServices={this.state.loadingServices}
                    />
                    <AppointmentList
                        guests={this.state.guests}
                        staffs={this.state.staffs}
                        services={this.state.services}
                        loadingGuests={this.state.loadingGuests}
                        loadingStaffs={this.state.loadingStaffs}
                        loadingServices={this.state.loadingServices}
                    />
                </Stack>
                <DebugList/>
            </div>
        );
    }

}
