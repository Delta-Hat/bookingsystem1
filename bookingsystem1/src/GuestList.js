import React, { Component } from 'react';
import Guest from './Guest';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
//import InputAdornment from '@mui/material/InputAdornment';
//import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
export default class GuestList extends Component {
    static displayName = GuestList.name;

    constructor(props) {
        super(props);
        this.state = { guests: [], loading: true, creatingNewGuest: false };
        //this.handleCloseNewGuestMenu = this.handleCloseNewGuestMenu.bind(this);
        //this.handleOpenNewGuestMenu = this.handleOpenNewGuestMenu.bind(this);
    }

    componentDidMount() {
        this.populateGuestData();
    }

    componentDidUpdate() {
        console.log("GuestList.componentDidUpdate()")
    }

    handleOpenNewGuestMenu = () => {
        console.log("GuestList.handleOpenNewGuestMenu()");
        this.setState({ creatingNewGuest: true });
    };

    handleCloseNewGuestMenu = () => {
        console.log("GuestList.handleCloseNewGuestMenu()");
        this.setState({ creatingNewGuest: false });
    };

    handleCreateNewGuest = async () => {
        console.log("GuestList.handleCreateNewGuest()");
        var firstNameInput = document.getElementById("firstName").value;
        var lastNameInput = document.getElementById("lastName").value;
        var phoneNumberInput = document.getElementById("phoneNumber").value;
        var emailInput = document.getElementById("email").value;
        console.log(firstNameInput + " " + lastNameInput + " " + phoneNumberInput + " " + emailInput);
        if (firstNameInput == "" || lastNameInput == "") {
            return;
        }
        const response = await fetch("api/guests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
            body: JSON.stringify({
                firstName: firstNameInput,
                lastName: lastNameInput,
                phoneNumber: phoneNumberInput,
                email: emailInput
            })
        });
        console.log(response.headers);
        console.log(response.json());
        this.populateGuestData();
        this.setState({ creatingNewGuest: false });
    };

    render() {
        let guestList = this.state.loading
            ? <CircularProgress />
            : GuestList.renderGuests(this.state.guests);
        return (
            <div>
                <Card sx={{minHeight: 600, minWidth:260} }>
                    <CardContent>
                        <Stack
                            divider={<Divider orientation="horizontal" flexItem/> }
                        >
                            <Typography variant="h5">
                                Guests
                            </Typography>
                            <Grid container position="relative">
                                <Grid container justifyContent="center" direction="row">
                                    {guestList}
                                </Grid>
                                
                                <Grid container justifyContent="center" alignItems="flex-end" direction="row" >
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{ textAlign: "center" }}
                                        onClick={this.handleOpenNewGuestMenu} >
                                        <AddIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
                <Dialog open={this.state.creatingNewGuest} onClose={this.handleCloseNewGuestMenu} >
                    <DialogTitle>Create New Guest</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter Guest info.</DialogContentText>
                    </DialogContent>
                    <Stack spacing={1}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            required
                        />
                        <TextField
                            id="lastName"
                            label="Last Name"
                            required
                        />
                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            type="tel"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                        />
                    </Stack>
                    <DialogActions>
                        <Button onClick={this.handleCreateNewGuest}>Create</Button>
                        <Button onClick={this.handleCloseNewGuestMenu}>Cancel</Button>
                    </DialogActions>
                </Dialog>
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
        console.log('GuestList.populateGuestData()');
        const response = await fetch('api/guests');
        const data = await response.json();
        this.setState({ guests: data, loading: false });
    }
}