import React, { Component } from 'react';
import DebugList from './DebugList';
import GuestList from './GuestList';
import StaffList from './StaffList';
import Stack from '@mui/material/Stack';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    
    

    

    render() {
        

        return (
            <div>
                <Stack direction="row" spacing={1}>
                    <GuestList />
                    <StaffList />
                </Stack>
                <DebugList/>
            </div>
        );
    }

}
