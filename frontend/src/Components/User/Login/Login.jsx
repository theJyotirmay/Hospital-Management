import React from "react";
import { TextField, Button, Grid, Typography, Card, CardContent, Stack } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../slices/Loginslice";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import { alpha, useTheme } from "@mui/material/styles";
import PageShell from "../layout/PageShell";

function LoginForm() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const data = await dispatch(loginAsync(values));

      if (data.meta.requestStatus === "rejected") {
        toast.error(data.payload.message);
      }

      const token = localStorage.getItem("jwt");
      const is_admin = localStorage.getItem("is_admin");
      if (token && is_admin === "false") {
        navigate("/");
        window.location.reload("true");
        toast.success("login successfully");
      }
      if (token && is_admin === "true") {
        navigate("/");
        window.location.reload("true");

        toast.success(" admin login successfully");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const validationSchema = yup.object({
    username: yup.string().required("Username must be required"),
    password: yup.string().required("Password must be required"),
  });

  return (
    <>
      <PageShell
        title="Login"
        subtitle="Access your account to book appointments and view reports."
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
                Welcome back
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
