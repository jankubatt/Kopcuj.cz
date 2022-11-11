import React from 'react';
import {Button, Card, CardContent, Typography} from '@mui/material';

const Discussion = (props) => {
    return (
        <>
            <Card key={props.data._id} sx={{marginTop: "10px"}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {props.data.subject}
                    </Typography>
                    <Typography variant="body2">
                        {props.data.text}
                    </Typography>

                    <Button sx={{marginTop: "5px"}} variant="contained"><a
                        href={`http://localhost:3000/discussion?id=${props.data._id}`}>K diskuzi</a></Button>
                </CardContent>
            </Card>
        </>
    )
}

export default Discussion;