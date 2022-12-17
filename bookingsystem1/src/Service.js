import { Component } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default class Service extends Component {
    static displayName = Service.name;

    constructor(props) {
        super(props);
        this.state = { service: props.service };
    }

    render() {
        return (
            <div>
                <Card sx={{ minWidth: 250 }}>
                    <CardContent>
                        <Stack spacing={0.3}>
                            <Typography variant="body1">
                                {this.state.service.name}
                            </Typography>
                            <Typography variant="body2">
                                {'\u2022'} {this.state.service.category} {'\u2022'} ${this.state.service.price }
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </div>
        );
    }
}