

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PageShell from '../layout/PageShell';

const Report = () => {
  const theme = useTheme();
  const [datas, setDatas] = useState();
  const { id } = useParams();
  const token = localStorage.getItem('jwt');

  const doctorDetails = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/patient/single-appointment/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(data.appointment);

      setDatas(data?.appointment);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    doctorDetails(id);
  }, []);

  return (
    <PageShell
      title="Medical report"
      subtitle="Your appointment summary and prescribed medicines."
      maxWidth="lg"
    >
      <Grid container spacing={2.5} alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 5,
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={1.25}>
                <Typography sx={{ fontWeight: 950, fontSize: 18 }}>
                  Patient details
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Name: {datas?.user?.username}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Email: {datas?.user?.email}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Phone: {datas?.user?.phone}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Location: {datas?.user?.location}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Age: {datas?.user?.age}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 5,
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
                Diagnosis Details
              </Typography>
              <Grid container spacing={1.25}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Date: {datas?.date ? new Date(datas?.date).toLocaleDateString() : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Doctor: {datas?.doctor?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Chief Complaints: {datas?.chief_complaints}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Invoice: {datas?.doctor?.ammount}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    About/Extra Info: {datas?.about}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Primary Diagnosis: {datas?.primary_diagnosis}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Investigation Advice: {datas?.investigation_advice}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Final Diagnosis: {datas?.final_diagnosis}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Treatment: {datas?.treatment}
                  </Typography>
                </Grid>
              </Grid>

              <Typography sx={{ mt: 2.25, fontWeight: 900 }}>
                Medicine
              </Typography>
              <List sx={{ mt: 0.75 }}>
                {datas?.medicine?.map((med, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                      mb: 1,
                    }}
                  >
                    <ListItemText primary={med} />
                  </ListItem>
                ))}
              </List>

              <Typography sx={{ mt: 1.5, color: 'text.secondary' }}>
                Payment: {datas?.payment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageShell>
  );
};

export default Report;
