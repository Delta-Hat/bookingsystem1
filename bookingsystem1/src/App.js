import React, { Component } from 'react';
import DebugList from './DebugList';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    
    

    

    render() {
        

        return (
            <div>
                

                <DebugList></DebugList>
            </div>
        );
    }

}
