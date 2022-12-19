import { Component } from "react";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
//import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default class Appointment extends Component {
    static displayName = Appointment.name;

    constructor(props) {
        super(props);

        var startTimeNums = props.appointment.startDate.split("T")[1].split(".")[0].split(":");
        var endTimeNums = props.appointment.endDate.split("T")[1].split(".")[0].split(":");
        var startTime = "";
        var endTime = ""

        //TODO refactor this into a function
        if (parseInt(startTimeNums[0]) > 11) {
            startTime = startTimeNums[0] == "12"
                ? "12" + ":" + endTimeNums[1] + "PM"
                : (parseInt(startTimeNums[0]) - 12).toString() + ":" + startTimeNums[1] + "PM";
        } else {
            var startHour = startTimeNums[0] == "00"
                ? "12"
                : startTimeNums[0];
            startHour = startHour.charAt(0) == '0'
                ? startHour.split("0")[1]
                : startHour;//converts times 00
            startTime = startHour + ":" + startTimeNums[1] + "AM";
        }
        if (parseInt(endTimeNums[0]) > 11) {
            endTime = endTimeNums[0] == "12"
                ? "12" + ":" + endTimeNums[1] + "PM"
                : (parseInt(endTimeNums[0]) - 12).toString() + ":" + endTimeNums[1] + "PM";
        } else {
            var endHour = endTimeNums[0] == "00"
                ? "12"
                : endTimeNums[0];
            endHour = endHour.charAt(0) == '0'
                ? endHour.split("0")[1]
                : endHour;
            endTime = endHour + ":" + endTimeNums[1] + "AM";
        }

        //TODO May want to refactor this to not store data in state that could be passed as props.
        //It could be resource intensive to do an API call for each appointment variable.
        //Problem is, we could end up with a bunch of annoying join functions in the React app,
        //which would not be fun to implement.
        this.state = {
            appointment: props.appointment,
            guestFirstName: "",
            guestLastName: "",
            staffFirstName: "",
            staffLastName: "",
            startTime: startTime,
            endTime: endTime,
            serviceName: "",
            loadingGuest: true,
            loadingStaff: true,
            loadingService: true,
            editing: false,
            dateUnixInput: null,
            dateInput: "",
            startTimeUnixInput: null,
            startTimeInput: "",
            endTimeUnixInput: null,
            endTimeInput: ""
        };
        this.requeryAppointmentData = props.listeners.appointmentListener;
    }

    handleOpenEditMenu = () => {
        console.log("Appointment.handleOpenEditMenu()");
        this.setState({ editing: true });
    }

    handleCloseEditMenu = () => {
        console.log("Appointment.handleCloseEditMenu()");
        this.setState({ editing: false });
    }

    handleEditAppointment =  async () => {
        console.log("Appointment.handleEditAppointment()");

        const response = await fetch("api/appointments/byid/" + this.state.appointment.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
            body: JSON.stringify({
                id: this.state.appointment.id,
                guestId: this.state.appointment.guestId,
                staffId: this.state.appointment.staffId,
                serviceId: this.state.appointment.serviceId,
                startDate: this.state.dateInput + "T" + this.state.startTimeInput,
                endDate: this.state.dateInput + "T" + this.state.endTimeInput
            })
        });
        console.log(JSON.stringify({
            id: this.state.appointment.id,
            guestId: this.state.appointment.guestId,
            staffId: this.state.appointment.staffId,
            serviceId: this.state.appointment.serviceId,
            startDate: this.state.dateInput + "T" + this.state.startTimeInput,
            endDate: this.state.dateInput + "T" + this.state.endTimeInput
        }));
        console.log(response.status);
        this.requeryAppointmentData();
        this.setState({ editing: false });
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

    async populateAppointmentGuestDetails() {
        console.log("Appointment.populateAppointmentGuestDetails()");
        const response = await fetch("api/guests/" + this.state.appointment.guestId.toString());
        const data = await response.json();
        this.setState({
            guestFirstName: data.firstName,
            guestLastName: data.lastName,
            loadingGuest: false
        });
    }

    async populateAppointmentStaffDetails() {
        console.log("Appointment.populateAppointmentStaffDetails()");
        const response = await fetch("api/staffs/" + this.state.appointment.staffId.toString());
        const data = await response.json();
        this.setState({
            staffFirstName: data.firstName,
            staffLastName: data.lastName,
            loadingStaff: false
        });
    }

    async populateAppointmentServiceDetails() {
        console.log("Appointment.populateAppointmentServiceDetails()");
        console.log("api/services/" + this.state.appointment.serviceId.toString());
        const response = await fetch("api/services/" + this.state.appointment.serviceId.toString());
        const data = await response.json();
        this.setState({
            serviceName: data.name,
            loadingService: false
        });
    }

    componentDidMount() {
        this.populateAppointmentGuestDetails();
        this.populateAppointmentStaffDetails();
        this.populateAppointmentServiceDetails();
    }

    render() {

        if (this.state.loadingGuest || this.state.loadingStaff || this.state.loadingService) {
            return (<CircularProgress />)
        }
        return (
            <Card sx={{ minWidth: 250 }}>
                <CardContent>
                    <Stack direction="row">
                        <Box sx={{ minWidth:240 }}>
                            <Stack spacing={0.3}>
                                <Typography variant="body1">
                                    {this.state.guestFirstName} {this.state.guestLastName }
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <AccessTimeOutlinedIcon />
                                    <Typography variant="body2">
                                        {this.state.startTime} - {this.state.endTime}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <SpaOutlinedIcon/>
                                    <Typography variant="body2">
                                        {this.state.serviceName}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <PersonOutlineOutlinedIcon/>
                                    <Typography variant="body2">
                                        {this.state.staffFirstName} {this.state.staffLastName}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box>
                            <Fab
                                color="primary"
                                aria-label="edit"
                                style={{ textAlign: "center" }}
                                onClick={this.handleOpenEditMenu} >
                                <EditOutlinedIcon />
                            </Fab>
                        </Box>
                    </Stack>
                </CardContent>
                <Dialog open={this.state.editing} onClose={this.handleCloseEditMenu}>
                    <DialogTitle>Reschedule Appointment</DialogTitle>
                    <Stack spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                inputFormat="YYYY-MM-DD"
                                value={this.state.dateUnixInput}
                                onChange={this.handleChangeDateInput}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
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
                    </Stack>
                    <DialogActions>
                        <Button onClick={this.handleEditAppointment}>Apply</Button>
                        <Button onClick={this.handleCloseEditMenu}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    }

    
}