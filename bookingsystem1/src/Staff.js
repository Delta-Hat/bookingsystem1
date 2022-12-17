import { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


export default class Staff extends Component {
    static displayName = Staff.name;

    constructor(props) {
        super(props);
        this.state = { staff: props.staff };
    }

    render() {
        return (
            <div>
                <Card sx={{ minWidth: 250 }}>
                    <CardContent>
                        <Stack spacing={0.3}>
                            <Typography variant="body1">
                                {this.state.staff.firstName} {this.state.staff.lastName}
                            </Typography>
                            <Typography variant="body2">
                                {'\u2022'} {this.state.staff.jobTitle}
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </div>
        );
    }
}