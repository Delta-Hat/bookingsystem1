import { Component } from "react";

export default class Appointment extends Component {
    static displayName = Appointment.name;

    constructor(props) {
        super(props);
        this.state = {
            appointment: props.appointment,
            guestFirstName: "",
            guestLastName: "",
            staffFirstName: "",
            staffLastName: "",
            startTime: "",
            endTime: "",
            serviceName: ""
        };
    }

    async populateAppointmentGuestDetails() {
        console.log("Appointment.populateAppointmentGuestDetails()");
        const guestResponse = await fetch("api/guests/" + this.state.appointment.guestId);
        const guestData = await guestResponse.json();
        this.setState({ guestFirstName: guestData.firstName, guestLastName: guestData.lastName });
    }

    async populateAppointmentStaffDetails() {
        console.log("Appointment.populateAppointmentStaffDetails()");
    }

    render() {
        return (
            <Card sx={{ mindWidth: 250 }}>
                <CardContent>
                    
                </CardContent>
            </Card>
        );
    }

    
}