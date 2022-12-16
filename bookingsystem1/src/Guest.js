import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
export default class Guest extends Component {
    static displayName = Guest.name;

    constructor(props) {
        super(props);
        this.state = { guest: props.guest, loading: true };
    }

    render() {
        return (
            <div>
                {/* }
                <h4>{this.state.guest.firstName} {this.state.guest.lastName}</h4>
                <p>Phone: {this.state.guest.phoneNumber}</p>
                <p>Email: {this.state.guest.email}</p>
                */}
                <Card sx={{ minWidth: 250 }}>
                    <CardContent>
                        <Stack spacing={0.3}>
                            <Typography variant="body1">
                                {this.state.guest.firstName} {this.state.guest.lastName}
                            </Typography>
                            <Typography variant="body2">
                                <Stack direction="row" spacing={1}>
                                    <LocalPhoneOutlinedIcon />
                                    <Box>{this.state.guest.phoneNumber}</Box>
                                </Stack> 
                            </Typography>
                            <Typography variant="body2">
                                <Stack direction="row" spacing={1}>
                                    <EmailOutlinedIcon/>
                                    <Box>{this.state.guest.email}</Box>
                                </Stack>
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </div>
        );
    }
}