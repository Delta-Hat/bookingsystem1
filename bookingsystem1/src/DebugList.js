import React, { Component } from 'react';


export default class DebugList extends Component {
    static displayName = DebugList.name;

    constructor(props) {
        super(props);
        this.state = {
            guests: [],
            staffs: [],
            services: [],
            appointments: [],
            loadingGuests: true,
            loadingStaffs: true,
            loadingServices: true,
            loadingAppointments: true
        }
    }

    componentDidMount() {
        console.log('componentDidMount()');
        this.populateGuestData();
        this.populateStaffData();
        this.populateServiceData();
        this.populateAppointmentData();
        //this.setState({ loading: false });
    }

    render() {
        console.log('render()');
        let guestTable = this.state.loadingGuests
            ? <p>Loading Guests...</p>
            : DebugList.renderGuestTable(this.state.guests);
        let staffTable = this.state.loadingStaffs
            ? <p>Loading Staffs...</p>
            : DebugList.renderStaffTable(this.state.staffs);
        let serviceTable = this.state.loadingServices
            ? <p>Loading Services...</p>
            : DebugList.renderServiceTable(this.state.services);
        let appointmentsTable = this.state.loadingAppointments
            ? <p>Loading Appointments...</p>
            : DebugList.renderAppointmentTable(this.state.appointments);
        return (
            <div>
                <h1>Debug List</h1>
                <h2>Guest Table</h2>
                {guestTable}
                <h2>Staff Table</h2>
                {staffTable}
                <h2>Service Table</h2>
                {serviceTable}
                <h2>Appointment Table</h2>
                {appointmentsTable}
            </div>
        );
    }


    static renderGuestTable(guests) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Guest ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map(guest =>
                        <tr key={guest.id}>
                            <td>{guest.id}</td>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.phoneNumber}</td>
                            <td>{guest.email}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderStaffTable(staffs) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Staff ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Job Title</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map(staff =>
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.jobTitle}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderServiceTable(services) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service =>
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.category}</td>
                            <td>{service.price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderAppointmentTable(appointments) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Guest ID</th>
                        <th>Staff ID</th>
                        <th>Service ID</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment =>
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
                            <td>{appointment.guestId}</td>
                            <td>{appointment.staffId}</td>
                            <td>{appointment.serviceId}</td>
                            <td>{appointment.startDate}</td>
                            <td>{appointment.endDate }</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    /*
    async populateData() {
        this.populateGuestData();
        this.populateStaffData();
        this.populateServiceData();
        this.populateAppointmentData();
        this.setState({ loading: false });

    }
    */

    async populateGuestData() {
        console.log('populateGuestData()');
        const response = await fetch('api/guests');
        const data = await response.json();
        this.setState({ guests: data, loadingGuests: false });
    }

    async populateStaffData() {
        const response = await fetch('api/staffs');
        const data = await response.json();
        this.setState({ staffs: data, loadingStaffs: false });
    }

    async populateServiceData() {
        const response = await fetch('api/services');
        const data = await response.json();
        this.setState({ services: data, loadingServices: false });
    }

    async populateAppointmentData() {
        const response = await fetch('api/appointments');
        const data = await response.json();
        this.setState({ appointments: data, loadingAppointments: false });
    }
}