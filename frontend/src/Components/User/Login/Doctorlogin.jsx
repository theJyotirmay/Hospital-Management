import React from "react";
import { TextField, Button, Grid, Typography, Card, CardContent, Stack } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../slices/Loginslice";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import axios from "axios";
import { alpha, useTheme } from "@mui/material/styles";
import PageShell from "../layout/PageShell";

function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    // console.log(values);
    try {
        const response= await axios.post ("https://hospital-management-1-dahm.onrender.com/doctorsignin",values)
        console.log(response.data)
        
        if(response.status===200){
            localStorage.setItem("jwt",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
            localStorage.setItem("is_doctor",response.data.user.is_doctor)
            if(response.data.user.is_doctor===true){
                toast.success("login successfully")
                
                navigate("/")
                window.location.reload("true")
            }

        }
        else{
            toast.error("login failed")
        }


    }
    catch(error){
        console.log(error.message)
    }   

    
  };

  const validationSchema = yup.object({
    email: yup.string().required("email must be required"),
    password: yup.string().required("Password must be required"),
  });

  return (
    <>
      <PageShell
        title="Doctor Login"
        subtitle="Sign in to manage appointments, reports, and patient details."
        maxWidth="sm"
      >
        <Card
          elevation={0}
          sx={{
            maxWidth: 520,
            mx: "auto",
            borderRadius: 5,
            border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.25}>
              <Typography sx={{ fontWeight: 950, fontSize: 22 }}>
                Welcome, doctor
              </Typography>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ py: 1.2, fontWeight: 900 }}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Stack>
          </CardContent>
        </Card>
      </PageShell>
    </>
  );
}

export default LoginForm;
