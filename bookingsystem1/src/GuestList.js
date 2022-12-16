import React, { Component } from 'react';
import Guest from './Guest';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default class GuestList extends Component {
    static displayName = GuestList.name;

    constructor(props) {
        super(props);
        this.state = { guests: [], loading: true };
    }

    componentDidMount() {
        this.populateGuestData();
    }

    render() {
        let guestList = this.state.loading
            ? <CircularProgress />
            : GuestList.renderGuests(this.state.guests);
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            Guests
                        </Typography>
                        {guestList}
                    </CardContent>
                </Card>
            </div>
        );

    }

    static renderGuests(guests) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <tbody>
                    {guests.map(guest =>
                        <tr key={guest.id}>
                            <td>
                                <Guest guest={guest }/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    async populateGuestData() {
        console.log('populateGuestData()');
        const response = await fetch('api/guests');
        const data = await response.json();
        this.setState({ guests: data, loading: false });
    }
}