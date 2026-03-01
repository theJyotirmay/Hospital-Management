// import React from 'react';
// import { Container, Typography, Grid, Card, CardMedia, List, ListItem } from '@mui/material';
// import AboutImage from './AboutImg';

// const AboutUs = () => {
//   return (
//     <Container maxWidth="xl"   >
//       <AboutImage/>
//       <Typography variant="h4" component="h1" style={{ marginBottom: '1rem', marginTop: '2rem' ,}}>
//         About Us
//       </Typography>
//       <Typography variant="body1" paragraph>
//         Welcome to our hospital management system! We are dedicated to providing
//         exceptional healthcare services to our patients and streamlining
//         administrative tasks for our staff.
//       </Typography>
//       <Typography variant="body1" paragraph>
//         Our team of experienced doctors, nurses, and administrators work
//         tirelessly to ensure the smooth operation of the hospital and the
//         highest level of care for our patients.
//       </Typography>
//       <Typography variant="h5" component="h2" style={{ marginBottom: '1rem' }}>
//         Our Mission
//       </Typography>
//       <Typography variant="body1" paragraph>
//         Our mission is to improve the health and well-being of our community by
//         providing accessible, high-quality medical services. We strive to
//         enhance patient outcomes, promote health education, and implement
//         innovative technology solutions to optimize healthcare delivery.
//       </Typography>
//       <Typography variant="h5" component="h2" style={{ marginBottom: '1rem' }}>
//         Our Values
//       </Typography>
//       <List>
//         <ListItem style={{ marginBottom: '0.5rem' }}>
//           <Typography variant="body1">Compassion: We treat every patient with empathy and understanding.</Typography>
//         </ListItem>
//         <ListItem style={{ marginBottom: '0.5rem' }}>
//           <Typography variant="body1">Excellence: We are committed to delivering the highest standard of care.</Typography>
//         </ListItem>
//         <ListItem style={{ marginBottom: '0.5rem' }}>
//           <Typography variant="body1">Integrity: We uphold ethical principles and maintain trust.</Typography>
//         </ListItem>
//         <ListItem style={{ marginBottom: '0.5rem' }}>
//           <Typography variant="body1">Collaboration: We foster teamwork and cooperation among our staff.</Typography>
//         </ListItem>
//         <ListItem style={{ marginBottom: '0.5rem' }}>
//           <Typography variant="body1">Innovation: We embrace new technologies and ideas to advance healthcare.</Typography>
//         </ListItem>
//       </List>
//       <Typography variant="h5" component="h2" style={{ marginBottom: '1rem' }}>
//         Contact Us
//       </Typography>
//       <Typography variant="body1" paragraph>
//         If you have any questions, suggestions, or would like to make an
//         appointment, please feel free to reach out to us. Our friendly staff
//         will be happy to assist you.
//       </Typography>
//       <Typography variant="body1" paragraph>
//         Phone: +91 8906863492
//         <br />
//         Email:  eye0781@gmail.com
//       </Typography>
//     </Container>
//   );
// };

// export default AboutUs;
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AboutImage from './AboutImg';
import PageShell from '../../layout/PageShell';

const AboutUs = () => {
  const theme = useTheme();

  const values = [
    {
      title: 'Compassion',
      text: 'We treat every patient with empathy and understanding.',
    },
    {
      title: 'Excellence',
      text: 'We are committed to delivering the highest standard of care.',
    },
    {
      title: 'Integrity',
      text: 'We uphold ethical principles and maintain trust.',
    },
    {
      title: 'Collaboration',
      text: 'We foster teamwork and cooperation among our staff.',
    },
    {
      title: 'Innovation',
      text: 'We embrace new technologies and ideas to advance healthcare.',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <AboutImage />
      <PageShell
        title="About"
        subtitle="A modern hospital experience built around clarity, trust, and care."
        maxWidth="lg"
      >
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 5,
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.9),
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                    Who we are
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    Welcome to our hospital management system! We are dedicated to providing
                    exceptional healthcare services to our patients and streamlining
                    administrative tasks for our staff.
                  </Typography>
                  <Typography sx={{ mt: 1.25, color: 'text.secondary', lineHeight: 1.8 }}>
                    Our team of experienced doctors, nurses, and administrators work
                    tirelessly to ensure the smooth operation of the hospital and the
                    highest level of care for our patients.
                  </Typography>
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
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                    Our mission
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    Our mission is to improve the health and well-being of our community by
                    providing accessible, high-quality medical services. We strive to
                    enhance patient outcomes, promote health education, and implement
                    innovative technology solutions to optimize healthcare delivery.
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

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
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                    Our values
                  </Typography>
                  <List sx={{ m: 0, p: 0 }}>
                    {values.map((v) => (
                      <ListItem key={v.title} sx={{ px: 0, py: 0.75 }}>
                        <Typography sx={{ fontWeight: 900, mr: 1 }}>
                          {v.title}:
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>{v.text}</Typography>
                      </ListItem>
                    ))}
                  </List>
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
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                    Contact
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    If you have any questions, suggestions, or would like to make an
                    appointment, please feel free to reach out to us. Our friendly staff
                    will be happy to assist you.
                  </Typography>
                  <Typography sx={{ mt: 1.25, color: 'text.secondary' }}>
                    Phone: +91 8906863492
                    <br />
                    Email: eye0781@gmail.com
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </PageShell>
    </Box>
  );
};

export default AboutUs;
