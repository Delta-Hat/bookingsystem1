import { Component } from "react";


export default class Service extends Component {
    static displayName = Service.name;

    constructor(props) {
        super(props);
        this.state = { service: props.service };
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}