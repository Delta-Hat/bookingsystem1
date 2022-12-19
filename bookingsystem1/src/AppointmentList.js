import React, { Component } from 'react';
import Appointment from './Appointment';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default class AppointmentList extends Component {
    static displayName = AppointmentList.name;

    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            loading: true,
            creatingNewAppointment: false,
            editingExistingAppointment: false,
            guestIdInput: 0,//default ID is 0, AKA an invalid Id
            staffIdInput: 0,
            serviceIdInput: 0
        }
    }

    async populateAppointmentData() {
        console.log('AppointmentList.populateAppointmentData()');
        //we're gonna need to modify the GET method in appointments to accept some kind of date param
        const response = await fetch('api/appointments');
        const data = await response.json();
        this.setState({ appointments: data, loading: false });
    }

    static renderAppointments(appointments) {
        return (
            <table>
                <tbody>
                    {appointments.map(appointment =>
                        <tr key={appointment.id}>
                            <td>
                                <Appointment appointment={appointment}/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        this.populateAppointmentData();
    }

    handleOpenNewAppointmentMenu = () => {
        console.log("AppointmentList.handleOpenNewAppointmentMenu()");
        this.setState({ creatingNewAppointment: true });
    }

    handleCloseNewAppointmentMenu = () => {
        console.log("AppointmentList.handleCloseNewAppointmentMenu()");
        this.setState({ creatingNewAppointment: false });
    }

    handleCreateNewAppointment = async () => {
        console.log("AppointmentList.handleCreateNewAppointment()");
        //TODO create new appointment
        this.setState({ creatingNewAppointment: false });
    }

    handleOpenEditAppointmentMenu = () => {
        console.log("AppointmentList.handleOpenEditAppointmentMenu()");
        this.setState({ editingExistingAppointment: true });
    }

    handleCloseEditAppointmentMenu = () => {
        console.log("AppointmentList.handleCloseEditAppontmentMenu");
        this.setState({ editingExistingAppointment: false });
    }

    handleEditExistingAppointment = async () => {
        console.log("AppointmentList.handleEditExistingAppointment()");
        //TODO edit existing appointment
        this.setState({ editingExistingAppointment: false });
    }

    //previously, we've been using document.getElementById() to get form data
    //however, it doesn't look like <Select> supports that, so we will use state instead.
    handleChangeGuestInput = (event) => {
        console.log("AppointmentList.handleChangeGuestInput()");
        this.setState({ guestIdInput: event.target.value });
    }

    handleChangeStaffInput = (event) => {
        console.log("AppointmentList.handleChangeStaffInput()");
        this.setState({ staffIdInput: event.target.value });
    }

    handleChangeServiceInput = (event) => {
        console.log("AppointmentList.handleChangeServiceInput()");
        this.setState({ serviceIdInput: event.target.value });
    }

    render() {
        let appointmentList = this.state.loading
            ? <CircularProgress />
            : AppointmentList.renderAppointments(this.state.appointments);
        return (
            
            <div>
                <Card sx={{ minHeight: 600, minWidth: 260 }}>
                    <CardContent>
                        <Box sx={{ minHeight: 490 }}>
                            <Stack
                                divider={<Divider orientation="horizontal" flexItem />} spacing={0.3}
                            >
                                <Typography variant="h5">
                                    Appointments
                                </Typography>
                                <Grid container justifyContent="center" direction="row">
                                    {appointmentList}
                                </Grid>
                            </Stack>
                        </Box>
                        <Box sx={{ mt: 2 }} display="flex" alignItems="flex-end">
                            <Grid container justifyContent="center" alignItems="flex-end" direction="row" >
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    style={{ textAlign: "center" }}
                                    onClick={this.handleOpenNewAppointmentMenu} >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
                <Dialog open={this.state.creatingNewAppointment} onClose={this.handleCloseNewAppointmentMenu}>
                    <DialogTitle>Create New Appointment</DialogTitle>
                    <Stack spacing={1}>
                        <Select
                            id="guestInput"
                            value={this.state.guestId}
                            label="Guest"
                            onChange={this.handleChangeGuestInput}
                        >
                            {/*this.state.guests.map(guest =>
                                <MenuItem value={guest.Id}>{guest.firstName} {guest.lastName}</MenuItem>
                            )*/}
                        </Select>
                    </Stack>
                    <DialogActions>
                        <Button onClick={this.handleCreateNewAppointment}>Create</Button>
                        <Button onClick={this.handleCloseNewAppointmentMenu}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }




}