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
        };
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
                            Edit (Evenutally)
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    
}