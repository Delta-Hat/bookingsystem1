import React, { Component } from 'react';
import Service from './Service';

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
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';


export default class ServiceList extends Component {
    static displayName = ServiceList.name;

    constructor(props) {
        super(props);
        this.state = {  loading: true, creatingNewService: false };
        this.requeryServiceData = props.listeners.serviceListener;
    }


    /*
    componentDidMount() {
        this.populateServiceData();
    }
    */

    handleOpenNewServiceMenu = () => {
        console.log("ServiceList.handleOpenNewServiceMenu()");
        this.setState({ creatingNewService: true });
    }

    handleCloseNewServiceMenu = () => {
        console.log("ServiceList.handleCloseNewServiceMenu()");
        this.setState({ creatingNewService: false });
    }

    

    handleCreateNewService = async () => {
        console.log("ServiceList.handleCreateNewService()");
        var nameInput = document.getElementById("name-service").value;
        var categoryInput = document.getElementById("category-service").value;
        //var priceInput = parseInt(document.getElementById("price-service").value);
        var priceInput = document.getElementById("price-service").value;
        console.log(nameInput + " " + categoryInput + " " + priceInput);
        if (
            nameInput == "" || nameInput == null ||
            categoryInput == "" || categoryInput == null ||
            priceInput == "" || priceInput == null
        ) {
            return;
        }
        
        const response = await fetch("api/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "text/plain"
            },
            body: JSON.stringify({
                name: nameInput,
                category: categoryInput,
                price: priceInput
            })
        });
        console.log(JSON.stringify({
            name: nameInput,
            category: categoryInput,
            price: priceInput 
        }));
        
        this.requeryServiceData();
        this.setState({ creatingNewService: false });
    }

    static renderServices(services) {
        return (
            <table className='table table-striped' area-lablledby='tableLabel'>
                <tbody>
                    {services.map(service =>
                        <tr key={service.id}>
                            <td>
                                <Service service={service }/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    

    render() {
        let serviceList = this.props.loading
            ? <CircularProgress />
            : ServiceList.renderServices(this.props.services);
        return (
            <div>
                <Card sx={{ minHeight: 600, minWidth: 260 }}>
                    <CardContent>
                        <Box sx={{ minHeight: 490 }}>
                            <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={0.3}>
                                <Typography variant="h5">
                                    Services
                                </Typography>
                                <Grid container position="relative">
                                    <Grid container justifyContent="center" alignItems="flex-end" direction="row">
                                        {serviceList}
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>
                        <Box sx={{ mt: 2 }} display="flex" alignItems="flex-end">
                            <Grid container justifyContent="center" alignItems="flex-end" direction="row">
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    style={{ textAlign: "center" }}
                                    onClick={this.handleOpenNewServiceMenu}
                                >
                                    <AddIcon />
                                </Fab>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Dialog open={this.state.creatingNewService} onClose={this.handleCloseNewServiceMenu}>
                        <DialogTitle>Create New Service</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Enter service info.</DialogContentText>
                        </DialogContent>
                        <Stack spacing={1}>
                            <TextField
                                id="name-service"
                                label="Name"
                                required
                            />
                            <TextField
                                id="category-service"
                                label="Category"
                                required
                            />
                            <TextField
                                id="price-service"
                                label="Price"
                                required
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                                } }
                            />
                        </Stack>
                        <DialogActions>
                            <Button onClick={this.handleCreateNewService}>Create</Button>
                            <Button onClick={this.handleCloseNewServiceMenu}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Card>
            </div>
        );
    }
}