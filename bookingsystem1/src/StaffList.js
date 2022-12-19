import React, { Component } from 'react';
import Staff from './Staff';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '../node_modules/@mui/material/index';

export default class StaffList extends Component {
    static displayName = StaffList.name;

    constructor(props) {
        super(props);
        this.state = { creatingNewStaff: false };
        this.requeryStaffData = props.listeners.staffListener;
    }

    /*
    componentDidMount() {
        this.populateStaffData();
    }
    */

    handleOpenNewStaffMenu = () => {
        console.log("StaffList.handleOpenNewStaffMenu()");
        this.setState({ creatingNewStaff: true });
    }

    handleCloseNewStaffMenu = () => {
        console.log("StaffList.handleCloseNewStaffMenu()");
        this.setState({ creatingNewStaff: false });
    }

    handleCreateNewStaff = async () => {
        console.log("StaffList.handleCreateNewStaff()");
        var firstNameInput = document.getElementById("firstName-staff").value;
        var lastNameInput = document.getElementById("lastName-staff").value;
        var jobTitleInput = document.getElementById("jobTitle-staff").value;
        console.log(firstNameInput + " " + lastNameInput + " " + jobTitleInput);
        if (
            firstNameInput == "" || firstNameInput == null ||
            lastNameInput == "" || lastNameInput == null ||
            jobTitleInput == "" || jobTitleInput == null
        ) {
            return; //invalid input
        }
        const response = await fetch("api/staffs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
            body: JSON.stringify({
                firstName: firstNameInput,
                lastName: lastNameInput,
                jobTitle: jobTitleInput
            })
        });
        console.log(response.headers);
        console.log(response.json());
        this.requeryStaffData();
        this.setState({ creatingNewStaff: false });
    }

    static renderStaffs(staffs) {
        return (
            <table className='table table-striped' area-labelledby='tableLabel'>
                <tbody>
                    {staffs.map(staff =>
                        <tr key={staff.id}>
                            <td>
                                <Staff staff={staff}/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    

    render() {
        let staffList = this.props.loading
            ? <CircularProgress />
            : StaffList.renderStaffs(this.props.staffs);
        return (
            <div>
                <Card sx={{ minHeight: 600, minWidth: 260 }}>
                    <CardContent>
                        <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={0.3}>
                            <Typography variant="h5">
                                Staff
                            </Typography>
                            <Grid container position="relative">
                                <Grid container justifyContent="center" alignItems="flex-end" direction="row">
                                    {staffList}
                                </Grid>
                                <Grid container justifyContent="center" alignItems="flex-end" direction="row">
                                    <Fab
                                        color="primary"
                                        aria-label="add"
                                        style={{ textAlign: "center" }}
                                        onClick={this.handleOpenNewStaffMenu }
                                    >
                                        <AddIcon/>
                                    </Fab>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
                <Dialog open={this.state.creatingNewStaff} onClose={this.handleCloseNewStaffMenu}>
                    <DialogTitle>Create New Staff</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter staff info.</DialogContentText>
                    </DialogContent>
                    <Stack spacing={1}>
                        <TextField
                            id="firstName-staff"
                            label="First Name"
                            required
                        />
                        <TextField
                            id="lastName-staff"
                            label="Last Name"
                            required
                        />
                        <TextField
                            id="jobTitle-staff"
                            label="Job Title"
                            required
                        />
                    </Stack>
                    <DialogActions>
                        <Button onClick={this.handleCreateNewStaff}>Create</Button>
                        <Button onClick={this.handleCloseNewStaffMenu}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}