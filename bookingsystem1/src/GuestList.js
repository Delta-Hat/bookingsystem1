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
import Box from '@mui/material/Box';
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
        this.state = { guests: [], loading: true, creatingNewGuest: false, overState:props.overState };
        //this.handleCloseNewGuestMenu = this.handleCloseNewGuestMenu.bind(this);
        //this.handleOpenNewGuestMenu = this.handleOpenNewGuestMenu.bind(this);
        this.appFunction = props.listeners.guestListener;

    }

    componentDidMount() {
        this.populateGuestData();
    }

    componentDidUpdate() {
        //TODO update list
        console.log("GuestList.componentDidUpdate()")
        //this.setState({ overState: this.props.overState });
    }

    handleOpenNewGuestMenu = () => {
        console.log("GuestList.handleOpenNewGuestMenu()");
        this.setState({ creatingNewGuest: true });
        this.appFunction();
    };

    handleCloseNewGuestMenu = () => {
        console.log("GuestList.handleCloseNewGuestMenu()");
        this.setState({ creatingNewGuest: false });
    };

    handleCreateNewGuest = async () => {
        console.log("GuestList.handleCreateNewGuest()");
        var firstNameInput = document.getElementById("firstName-guest").value;
        var lastNameInput = document.getElementById("lastName-guest").value;
        var phoneNumberInput = document.getElementById("phoneNumber-guest").value;
        var emailInput = document.getElementById("email-guest").value;
        console.log(firstNameInput + " " + lastNameInput + " " + phoneNumberInput + " " + emailInput);
        if (firstNameInput == "" || lastNameInput == "" || firstNameInput == null || lastNameInput == null) {
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
        console.log("GuestList.render()");
        console.log("Test state at sub render: " + this.state.overState);
        console.log("Test props at sub render: " + this.props.overState);
        let guestList = this.state.loading
            ? <CircularProgress />
            : GuestList.renderGuests(this.state.guests);
        return (
            <div>
                <Card sx={{ minHeight: 600, minWidth:260 }}>
                    <CardContent>
                        <Box sx={{ minHeight:490 }}>
                            <Stack
                                divider={<Divider orientation="horizontal" flexItem />} spacing={0.3 }
                            >
                                <Typography variant="h5">
                                    Guests
                                </Typography>
                                
                                    <Grid container justifyContent="center" direction="row">
                                        {guestList}
                                    </Grid> 
                                
                            </Stack>
                        </Box>
                        <Box sx={{mt:2}} display="flex" alignItems="flex-end">
                            <Grid container justifyContent="center" alignItems="flex-end" direction="row" >
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    style={{ textAlign: "center" }}
                                    onClick={this.handleOpenNewGuestMenu} >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
                <Dialog open={this.state.creatingNewGuest} onClose={this.handleCloseNewGuestMenu} >
                    <DialogTitle>Create New Guest</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter guest info.</DialogContentText>
                    </DialogContent>
                    <Stack spacing={1}>
                        <TextField
                            id="firstName-guest"
                            label="First Name"
                            required
                        />
                        <TextField
                            id="lastName-guest"
                            label="Last Name"
                            required
                        />
                        <TextField
                            id="phoneNumber-guest"
                            label="Phone Number"
                            type="tel"
                        />
                        <TextField
                            id="email-guest"
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
                                <Guest guest={guest}/>
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