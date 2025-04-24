'use client'
import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useState } from 'react';

const doctors = [
    {
        id: 1,
        name: "Dr. Robert Henry",
        specialty: "Cardiologist",
        image: "https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-600nw-2281709217.jpg",
    },
    {
        id: 2,
        name: "Dr. Harry Littleton",
        specialty: "Neurologist",
        image: "https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-600nw-2281709217.jpg",
    },
    {
        id: 3,
        name: "Dr. Sharina Khan",
        specialty: "Gynecologist",
        image: "https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-600nw-2281709217.jpg",
    },
    {
        id: 4,
        name: "Dr. Sanjeev Kapoor",
        specialty: "Child Specialist",
        image: "https://www.shutterstock.com/image-vector/male-doctor-smiling-selfconfidence-flat-600nw-2281709217.jpg",
    },
];

const PatientHome = () => {
    return (
        <div>
            {/* <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="primary" style={{ flexGrow: 1 }}>
                        Hospital logo
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Services</Button>
                    <Button color="inherit">Doctors</Button>
                    <Button color="inherit">About us</Button>
                    <Button color="inherit">Contact us</Button>
                    <Button color="primary" variant="outlined" style={{ marginLeft: '10px' }}>Sign in</Button>
                    <Button color="primary" variant="contained" style={{ marginLeft: '10px' }}>Sign up</Button>
                </Toolbar>
            </AppBar> */}

            <Container style={{ textAlign: 'center', padding: '50px 0' }}>
                <Typography variant="h3" color="primary" gutterBottom>We care</Typography>
                <Typography variant="h4" color="textPrimary" gutterBottom>about your health</Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Good health is the state of mental, physical and social well-being and it does not just mean absence of disease.
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="primary" style={{ marginRight: '10px', height: '50px' }}>Book an appointment

                    </Button>
                    <Button variant="outlined" color="primary" style={{ height: '50px' }}>Watch videos</Button>
                </Box>
            </Container>


            <Container style={{ padding: '50px 0' }}>
                <Typography variant="h4" color="textPrimary" align="center" gutterBottom>Meet our Doctors</Typography>
                <Typography variant="body1" color="textSecondary" align="center" paragraph>Well qualified doctors are ready to serve you</Typography>
                <Grid container spacing={4} justifyContent="center">
                    {doctors.map((doctor) => (
                        <Grid key={doctor.id} >
                            <Card>
                                <CardMedia component="img" alt={doctor.name} height="200" image={doctor.image} />
                                <CardContent>
                                    <Typography variant="h6" color="textPrimary">{doctor.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{doctor.specialty}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" color="primary" fullWidth>
                                        Book an Appointment
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary">See more</Button>
                </Box>
            </Container>
        </div>
    );
}

export default PatientHome
