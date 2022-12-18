import { Component } from "react";

export default class Appointment extends Component {
    static displayName = Appointment.name;

    constructor(props) {
        super(props);
        this.state = { appointment: props.appointment };
    }

    
}