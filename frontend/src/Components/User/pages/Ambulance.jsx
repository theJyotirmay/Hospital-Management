import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import axios from 'axios';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
import { alpha, useTheme } from '@mui/material/styles';
import PageShell from '../layout/PageShell';

const AmbulanceBooking = () => {
  const theme = useTheme();

    const navigate=useNavigate();
  const [bookingInfo, setBookingInfo] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    emergencyType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bookingInfo)
     try {
        const response = await axios.post('http://localhost:8080/patient/ambulance', bookingInfo);
        console.log(response)
    if(response.status === 200 ){
    toast.success(response.data.message);
    navigate("/");

    }else{
    toast.error(response.data.message);

    }
}
 catch (error) {
    console.log(error.message)
}

  };

  return (
    <PageShell
      title="Ambulance"
      subtitle="Request an ambulance quickly — share your details and emergency type."
      maxWidth="sm"
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={2.25}>
            <Typography sx={{ fontWeight: 950, fontSize: 22 }}>
              Book an ambulance
            </Typography>
            <Stack component="form" onSubmit={handleSubmit} spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={bookingInfo.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    variant="outlined"
                    name="phoneNumber"
                    value={bookingInfo.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    name="address"
                    value={bookingInfo.address}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    name="city"
                    value={bookingInfo.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    variant="outlined"
                    name="state"
                    value={bookingInfo.state}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip code"
                    variant="outlined"
                    name="zip"
                    value={bookingInfo.zip}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" required>
                    <InputLabel id="emergencyType-label">Emergency type</InputLabel>
                    <Select
                      labelId="emergencyType-label"
                      label="Emergency type"
                      name="emergencyType"
                      value={bookingInfo.emergencyType}
                      onChange={handleChange}
                    >
                      <MenuItem value="">Select an emergency type</MenuItem>
                      <MenuItem value="Accident">Accident</MenuItem>
                      <MenuItem value="Medical Emergency">Medical Emergency</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.2, fontWeight: 900 }}
              >
                Book Ambulance
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default AmbulanceBooking;




