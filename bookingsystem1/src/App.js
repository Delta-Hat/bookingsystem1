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
        this.state = { forecasts: [], loading: true , testState: true};
    }

    
    requeryGuestListener = () => {
        console.log("App.requeryGuestListener()");
        console.log("Test state: " + this.state.testState);
        console.log("What it will be: " + !this.state.testState);
        this.setState({
            testState: !this.state.testState,
            guests: [],
            loadingGuests: true
        });
        
    }

    async populateAppointmentGuestDetails() {
        console.log("Appointment.populateAppointmentGuestDetails()");
        const response = await fetch("api/guests/" + this.state.appointment.guestId.toString());
        const data = await response.json();
        this.setState({
            guestFirstName: data.firstName,
            guestLastName: data.lastName,
            loadingGuest: false
        });
    }

    render() {
        
        console.log("App.render()");
        console.log("Test state at render: " + this.state.testState)
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <GuestList
                        listeners={{ guestListener: this.requeryGuestListener }}
                        overState={this.state.testState}
                        guests={this.state.guests}
                        loadingGuests={this.state.loadingGuests}
                    />
                    <StaffList />
                    <ServiceList />
                    <AppointmentList/>
                </Stack>
                <DebugList/>
            </div>
        );
    }

}
