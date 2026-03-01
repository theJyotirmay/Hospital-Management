import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import toast from 'react-hot-toast';


function Report() {
  const navigate = useNavigate();

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { id } = useParams();
  console.log(id)
  const [data, setDatas] = useState();
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [medicine, setmedicine] = useState([]);
  const [Medicine, setMedicine] = useState('');
  const [about, setAbout] = useState([]);
  const [primary_diagnosis, setPrimaryDiagnosis] = useState('');
  const [investigation_advice, setInvestigationAdvice] = useState('');
  const [final_diagnosis, setFinalDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [date, setDate] = useState(new Date());
  const [patientHistory, setPatientHistory] = useState([]);

  console.log(data)


  const fetchdata = async () => {
    try {
      const response = await axios.get(`https://hospital-management-1-dahm.onrender.com/single/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });

      setDatas(response.data.appointment);

      // Fetch patient history by getting all appointments and filtering
      const historyRes = await axios.get('https://hospital-management-1-dahm.onrender.com/appointments', {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
      if (historyRes.data.all_appointments && response.data.appointment?.user?._id) {
        const history = historyRes.data.all_appointments.filter(
          (app) => app.user._id === response.data.appointment.user._id && app._id !== id
        );
        setPatientHistory(history);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [isEditingDate]);

  useEffect(() => {
    if (data) {
      setAbout(data.about || '');
      setPrimaryDiagnosis(data.primary_diagnosis || '');
      setInvestigationAdvice(data.investigation_advice || '');
      setFinalDiagnosis(data.final_diagnosis || '');
      setTreatment(data.treatment || '');
    }
  }, [data]);

  const handlesave = async () => {
    setIsEditingDate(!isEditingDate);
    if (isEditingDate) {
    }
    try {

      const response = await axios.patch(`https://hospital-management-1-dahm.onrender.com/update-date`, { _id: id, date: selectedDate }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });
      console.log(response.date)
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleAddDisease = () => {
    if (Medicine !== '') {
      setmedicine([...medicine, Medicine]);
      setMedicine('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`https://hospital-management-1-dahm.onrender.com/update-medicine`, { _id: id, medicine, about, primary_diagnosis, investigation_advice, final_diagnosis, treatment }, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('jwt'),
        },
      });

      if (response.status === 200) {
        toast.success('Generate report successfully');
        navigate("/")
      } else {
        toast.error('Something went wrong');
      }

    } catch (error) {
      console.error(error);
    }

    // Handle form submission, e.g., send the data to the server
    // You can access all the form fields' values in this function
  };

  return (

    <>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{
          textAlign: "center",
          marginBottom: "60px"
        }}>Patient Information</Typography>


        <Grid container spacing={2}>




          <Grid item xs={6} >
            <Typography variant="h3">Patient Name</Typography>
            <Typography variant="h6">{data?.user?.username}</Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Email</Typography>
            <Typography variant="h6">{data?.user?.email}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Phone</Typography>
            <Typography variant="h6">{data?.user?.phone}</Typography>
          </Grid>

          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Address</Typography>
            <Typography variant="h6">{data?.user?.location}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Patient Age</Typography>
            <Typography variant="h6">{data?.user?.age}</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h3">Chief Complaints</Typography>
            <Typography variant="h6">{data?.chief_complaints}</Typography>
          </Grid>

          <Grid item xs={3} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>

            <Typography variant="h3">Date </Typography>
            {isEditingDate ? (

              <DatePicker
                open

                value={moment(data?.date).format('DD/MM/YYYY')}
                onChange={(newDate) => setSelectedDate(newDate)}
                // renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={new Date()}
              // You can customize the DatePicker appearance and behavior as needed
              />

            ) : (
              <Typography variant="h6">
                {moment(data?.date).format('DD/MM/YYYY')}
              </Typography>




            )}





          </Grid>

          <Grid item xs={6} md={6}>

            <Button
              variant="contained"
              color="primary"
              onClick={handlesave}
            >
              {isEditingDate ? 'Save Date' : 'Edit Date'}
            </Button>

          </Grid>









        </Grid>

      </Container>

      {/* Patient History Section */}
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Past Appointments History</Typography>
        {patientHistory.length === 0 ? (
          <Typography variant="body1">No past appointments found.</Typography>
        ) : (
          patientHistory.map((hist, index) => (
            <Grid container spacing={2} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '8px' }} key={index}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                <Typography variant="body1">{hist.date ? moment(hist.date).format('DD/MM/YYYY') : 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">Doctor</Typography>
                <Typography variant="body1">{hist.doctor?.name || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" color="textSecondary">Chief Complaints</Typography>
                <Typography variant="body1">{hist.chief_complaints}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Primary Diagnosis</Typography>
                <Typography variant="body1">{hist.primary_diagnosis || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">Treatment</Typography>
                <Typography variant="body1">{hist.treatment || 'N/A'}</Typography>
              </Grid>
            </Grid>
          ))
        )}
      </Container>

      <Container sx={{
        marginTop: "60px"
      }} maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" sx={{
            textAlign: "center",
            marginBottom: "60px"
          }}>Report Generator</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth

                variant="outlined"
                value={data?.user?.username}
                onChange={(e) => setPatientName(e.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth

                variant="outlined"
                value={data?.doctor?.name}
                onChange={(e) => setDoctorName(e.target.value)}
                disabled
              />
            </Grid>



            <Grid item xs={12}>
              <Typography variant="h6">Medicine Information</Typography>
              <TextField
                fullWidth
                label="Disease"
                variant="outlined"
                value={Medicine}
                onChange={(e) => setMedicine(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddDisease}>
                Add Medicine
              </Button>

            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">About / Extra Info</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Primary Diagnosis</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={primary_diagnosis}
                onChange={(e) => setPrimaryDiagnosis(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Investigation Advice</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={investigation_advice}
                onChange={(e) => setInvestigationAdvice(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Final Diagnosis</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={final_diagnosis}
                onChange={(e) => setFinalDiagnosis(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Treatment</Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Generate Report
          </Button>
        </form>
      </Container>


    </>
  );
}


export default Report;
