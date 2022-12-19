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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default class AppointmentList extends Component {
    static displayName = AppointmentList.name;

    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            loading: true,
            creatingNewAppointment: false,
            editingExistingAppointment: false,
            guestIdInput: "",
            staffIdInput: "",
            serviceIdInput: "",
            dateUnixInput: null,
            dateInput: "",
            startTimeUnixInput: null,
            startTimeInput: "",
            endTimeUnixInput: null,
            endTimeInput: ""
        }
        this.handleChangeGuestInput = this.handleChangeGuestInput.bind(this);
        this.handleChangeStaffInput = this.handleChangeStaffInput.bind(this);
        this.handleChangeServiceInput = this.handleChangeServiceInput.bind(this);
        //this.handleChangeDateInput = this.handleChangeDateInput.bind(this);
    }

    requeryAppointmentsListener = () => {
        console.log("AppointmentList.requeryAppointmentsListener()");
        this.populateAppointmentData();
        this.setState({ loading: true });
    }

    async populateAppointmentData() {
        console.log('AppointmentList.populateAppointmentData()');
        //we're gonna need to modify the GET method in appointments to accept some kind of date param
        const response = await fetch('api/appointments');
        const data = await response.json();
        this.setState({ appointments: data, loading: false });
    }

    static renderAppointments(appointments,appointmentListener) {
        return (
            <table>
                <tbody>
                    {appointments.map(appointment =>
                        <tr key={appointment.id}>
                            <td>
                                <Appointment appointment={appointment} listeners={{ appointmentListener: appointmentListener }} />
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

        const response = await fetch("api/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
            body: JSON.stringify({
                guestId: this.state.guestIdInput,
                staffId: this.state.staffIdInput,
                serviceId: this.state.serviceIdInput,
                startDate: this.state.dateInput + "T" + this.state.startTimeInput,
                endDate: this.state.dateInput + "T" + this.state.endTimeInput
            })
        });
        console.log(JSON.stringify({
            guestId: this.state.guestIdInput,
            staffId: this.state.staffIdInput,
            serviceId: this.state.serviceIdInput,
            startDate: this.state.dateInput + "T" + this.state.startTimeInput,
            endDate: this.state.dateInput + "T" + this.state.endTimeInput
        }));
        console.log(response.status);
        this.populateAppointmentData();
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
    handleChangeGuestInput(event){
        console.log("AppointmentList.handleChangeGuestInput()");
        console.log("GuestID Input: " + event.target.value);
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

    handleChangeDateInput = (dateUnix) => {
        console.log("AppointmentList.handleChangeDateInput()");
        console.log("Date Unix Input: " + dateUnix);
        //console.log("Year: " + date.y);
        this.setState({ dateUnixInput: dateUnix });
        var dateObj = new Date(dateUnix);
        console.log(dateObj.toString());
        var date = dateObj.getFullYear()
            + "-" + ((dateObj.getMonth() + 1) < 10 ? "0" + (dateObj.getMonth() + 1) : (dateObj.getMonth()))
                + "-" + (dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate());
        this.setState({ dateInput: date });
        console.log("Date Input: " + date);
    }

    handleChangeStartTimeInput = (timeUnix) => {
        console.log("AppointmentList.handleChangeStartTimeInput()");
        console.log("Time Unix Input: " + timeUnix);
        this.setState({ startTimeUnixInput: timeUnix });
        var dateObj = new Date(timeUnix);
        var time =
            (dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()) + ":"
            + (dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes()) + ":"
            + (dateObj.getSeconds() < 10 ? "0" + dateObj.getSeconds() : dateObj.getSeconds());
        this.setState({ startTimeInput: time });
        console.log("Time Input: " + time);
    }

    handleChangeEndTimeInput = (timeUnix) => {
        console.log("AppointmentList.handleChangeEndTimeInput()");
        console.log("Time Unix Input: " + timeUnix);
        this.setState({ endTimeUnixInput: timeUnix });
        var dateObj = new Date(timeUnix);
        var time =
            (dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()) + ":"
            + (dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes()) + ":"
            + (dateObj.getSeconds() < 10 ? "0" + dateObj.getSeconds() : dateObj.getSeconds());
        this.setState({ endTimeInput: time });
        console.log("Time Input: " + time);
    }


    render() {
        console.log("AppointmentList.render()");
        console.log(this.props.guests);
        let appointmentList = this.state.loading
            ? <CircularProgress />
            : AppointmentList.renderAppointments(this.state.appointments, this.requeryAppointmentsListener);
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
                        <FormControl>
                            <InputLabel id="guestInput-label">Guest</InputLabel>
                            <Select
                                labelId="guestInput-label"
                                id="guestInput"
                                value={this.state.guestIdInput}
                                label="Guest"
                                onChange={this.handleChangeGuestInput}
                            >
                                {this.props.guests.map(guest =>
                                    <MenuItem value={guest.id}>{guest.firstName} {guest.lastName}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                inputFormat="YYYY-MM-DD" //I'm partial to this data format. Plus, it's how DateTime is stored in the API.
                                value={this.state.dateUnixInput}
                                onChange={this.handleChangeDateInput}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker 
                                /*
                                 * This component seems to return a unix epoch value set to the current day and time at the user's timezone.
                                 * Currently, the API stores the date as a DateTime object which translates into a string value when passed
                                 * through the controller.
                                 * I don't have time to change it now but, in an ideal solution, I think the date ought to be stored as a long
                                 * representing a unix time value.
                                 * The front end can instead translate the unix time into a human readable time and vice-versa.
                                 * This would make it so that all time is stored on the same clock, regardless of timezone.
                                 */
                                label="Start Time"
                                value={this.state.startTimeUnixInput}
                                onChange={this.handleChangeStartTimeInput}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker 
                                label="End Time"
                                value={this.state.endTimeUnixInput}
                                onChange={this.handleChangeEndTimeInput}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <FormControl>
                            <InputLabel id="serviceInput-label">Service</InputLabel>
                            <Select
                                labelId="serviceInput-label"
                                id="serviceInput"
                                value={this.state.serviceIdInput}
                                label="Service"
                                onChange={this.handleChangeServiceInput}
                            >
                                {this.props.services.map(service =>
                                    <MenuItem value={service.id}>{service.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="staffInput-label">Staff</InputLabel>
                            <Select
                                labelId="staffInput-label"
                                id="staffInput"
                                value={this.state.staffIdInput}
                                label="Staff"
                                onChange={this.handleChangeStaffInput}
                            >
                                {this.props.staffs.map(staff =>
                                    <MenuItem value={staff.id}>{staff.firstName} {staff.lastName}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
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