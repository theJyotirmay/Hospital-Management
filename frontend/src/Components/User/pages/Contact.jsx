import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import PageShell from '../layout/PageShell';

const ContactUsPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
      contact,
    };
    const response = await axios.post('http://localhost:8080/patient/patientmessage', data);
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/");

    } else {
      toast.error(response.data.message);

    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");


  return (
    <PageShell
      title="Contact"
      subtitle="Questions, feedback, or support — reach out anytime."
      maxWidth="lg"
    >
      <Grid container spacing={2.5} alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Stack spacing={2.5}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                  Contact details
                </Typography>

                <Stack spacing={1.25}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Email color="primary" />
                    <Typography sx={{ color: "text.secondary" }}>
                      eye0781@gmail.com
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Phone color="primary" />
                    <Typography sx={{ color: "text.secondary" }}>
                      +91 8906863492
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <LocationOn color="primary" />
                    <Typography sx={{ color: "text.secondary" }}>
                      Ahmedabad, India
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 5,
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                backgroundColor: alpha(theme.palette.background.paper, 0.9),
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                  Send a message
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Contact number"
                        variant="outlined"
                        fullWidth
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ py: 1.2, fontWeight: 900 }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              height: "100%",
              borderRadius: 5,
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: { xs: "4 / 3", md: "16 / 10" },
                  "& iframe": {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  },
                }}
              >
                <iframe
                  title="Hospital location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.792113735044!2d72.57469279999999!3d23.034856400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8460655d8ccb%3A0xeab53dc1a141dd04!2sApollo%20Hospitals%20City%20Centre!5e0!3m2!1sen!2sin!4v1709405295240!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default ContactUsPage;
