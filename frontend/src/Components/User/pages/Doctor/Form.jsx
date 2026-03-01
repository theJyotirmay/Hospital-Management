import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css"
import PageShell from "../../layout/PageShell";

const AppointmentForm = () => {
  const [doctor, setDoctor] = useState()

  // const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);

  const { id } = useParams();
  const Navigate = useNavigate()

  const token = localStorage.getItem("jwt");

  const doctorDetails = async (id) => {
    try {
      const { data } = await axios.get(`https://hospital-management-1-dahm.onrender.com/public/doctor/${id}`, {
        headers: {
          authorization: token
        }
      })

      setDoctor(data.data)
    }
    catch (error) {

      toast.error(error.message)
    }




  }


  React.useEffect(() => {
    doctorDetails(id)

  }, [id])




  const [appointmentData, setAppointmentData] = useState({
    doctor: id,
    chief_complaints: "",
    date: "",
    // status:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submithandler = async (event) => {
    event.preventDefault();



    try {
      const res = await axios.post(
        "https://hospital-management-1-dahm.onrender.com/patient/appointment",
        appointmentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            // Add more headers as needed
          },
        }
      );
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    // Reset the form
    setAppointmentData({
      doctor: id,
      chief_complaints: "",
      date: "",
      // status:''
    });
  };


  const handlejoin = () => {
    Navigate(`/room/${doctor?.roomid}`)
  }





  return (
    <PageShell
      title="Book appointment"
      subtitle="Review the doctor profile and schedule your visit."
      maxWidth="lg"
    >
      {!doctor ? (
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
          Loading doctor details…
        </Typography>
      ) : (
        <Grid container spacing={2.5}>
          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: 5, overflow: 'hidden' }}>
              <Grid container>
                <Grid item xs={12} sm={5}>
                  <img
                    src={doctor?.image}
                    alt={doctor?.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 260 }}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography sx={{ fontWeight: 950, fontSize: 22 }}>
                      {doctor?.name}
                    </Typography>
                    {!!doctor?.desc && (
                      <Typography sx={{ mt: 0.75, color: 'text.secondary' }}>
                        {doctor?.desc}
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={0.75}>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Email: {doctor?.email}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Phone: {doctor?.contact}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>
                        Fee: {doctor?.ammount}
                      </Typography>
                    </Stack>

                    {!!doctor?.expertise?.length && (
                      <>
                        <Typography sx={{ mt: 2.5, fontWeight: 900 }}>
                          Expertise
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                          {doctor?.expertise?.map((item, index) => (
                            <Chip key={`${item}-${index}`} label={item} size="small" />
                          ))}
                        </Stack>
                      </>
                    )}

                    {!!doctor?.date?.length && (
                      <>
                        <Typography sx={{ mt: 2.5, fontWeight: 900 }}>
                          Available time
                        </Typography>
                        <List
                          dense
                          sx={{
                            mt: 0.75,
                            listStyleType: 'disc',
                            pl: 2,
                            '& .MuiListItem-root': { display: 'list-item', py: 0.25 },
                          }}
                        >
                          {doctor?.date?.map((item, index) => (
                            <ListItem key={`${item}-${index}`}>{item}</ListItem>
                          ))}
                        </List>
                      </>
                    )}
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={0} sx={{ borderRadius: 5 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography sx={{ fontWeight: 950, fontSize: 20 }}>
                  Appointment details
                </Typography>
                <Typography sx={{ mt: 0.75, color: 'text.secondary' }}>
                  Tell us what you’re experiencing and pick a date.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1.5 }}>
                  <Grid item xs={12}>
                    <TextField
                      name="chief_complaints"
                      label="Chief Complaints / Symptoms"
                      value={appointmentData.chief_complaints}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      selected={appointmentData.date}
                      onChange={(date) => setAppointmentData({ ...appointmentData, date })}
                      placeholderText="Select a date"
                      minDate={new Date()}
                      required
                      customInput={<TextField fullWidth label="Date" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      onClick={submithandler}
                      disabled={!appointmentData.chief_complaints || !appointmentData.date}
                    >
                      Submit appointment
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </PageShell>
  );
};


export default AppointmentForm;

