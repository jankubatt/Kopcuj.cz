import React from 'react';
import '../App.css';
import Discussion from '../components/Discussion';
import { TextField, Container, Button } from '@mui/material';

function DiscussionPage() {
    return (
        <>
            <div className='navbar'>
                <div className='navbrand'>Kopcuj.cz</div>
                <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
            </div>

            <Container maxWidth="lg">
                <div className='formDiscussion'>
                    <h1>Vytvořit diskuzi</h1>
                    
                    <TextField id="outlined-basic" style={{width: "50%"}} label="Téma" variant="outlined" /><br/>
                    <TextField label="Myšlenka" multiline rows={10} maxRows={10} style={{marginTop: "10px", width: "100%"}} /><br/>
                    <Button variant="contained" style={{marginTop: "10px"}}>Vytvořit</Button>
                </div>

                <hr/>

                <Discussion />                
            </Container>
        </>
    )
}

export default DiscussionPage;