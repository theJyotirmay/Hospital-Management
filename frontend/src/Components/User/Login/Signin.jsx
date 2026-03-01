import React from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { Box } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';


import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { alpha, useTheme } from '@mui/material/styles';
import PageShell from '../layout/PageShell';

function SignUpForm() {
  const theme = useTheme();
  const Navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    gender:"",
    age:"",
  location:"",
  phone:"",


  };
  const validationSchema = yup.object({
    username: yup.string().required("Username must be required"),
    email: yup.string().email("Invalid email!").required("Email must be required"),
    password: yup
      .string()
      .required("Password must be required")
      .min(8, "Password must be greater than 8 characters"),
    gender: yup.string().required("Gender is required"),
    age: yup.string().required("Age is required"),
    location: yup.string().required("Location is required"),
    phone: yup.string().required("Phone is required"),
  });
  

  const onSubmit = async (values) => {
    console.log(values)
    try {
      const response = await axios.post(
        "https://hospital-management-1-dahm.onrender.com/signup",

        values
      );

      console.log(response);

      Navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during signup.");
      }
    }
  };
  return (
    <PageShell
      title="Create account"
      subtitle="Join to book appointments, manage your profile, and access reports."
      maxWidth="sm"
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 680,
          mx: "auto",
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={2.25}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.12), color: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 950, fontSize: 22 }}>Sign up</Typography>
                <Typography sx={{ color: 'text.secondary' }}>It only takes a minute.</Typography>
              </Box>
            </Stack>

            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Username"
                      variant="outlined"
                      name="username"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="username" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      type="email"
                      label="Email"
                      variant="outlined"
                      name="email"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="email" />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      type="password"
                      label="Password"
                      variant="outlined"
                      name="password"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="password" />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel id="gender-label">Gender</FormLabel>
                      <Field
                        name="gender"
                        as={RadioGroup}
                        row
                        aria-labelledby="gender-label"
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </Field>
                    </FormControl>
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="gender" />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Age"
                      variant="outlined"
                      name="age"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="age" />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Location"
                      variant="outlined"
                      name="location"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="location" />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      type="text"
                      label="Phone"
                      variant="outlined"
                      name="phone"
                      fullWidth
                    />
                    <Box sx={{ color: "error.main", mt: 0.5, fontSize: 13 }}>
                      <ErrorMessage name="phone" />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, py: 1.2, fontWeight: 900 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Stack>
        </CardContent>
      </Card>
    </PageShell>
  );
}

export default SignUpForm;







