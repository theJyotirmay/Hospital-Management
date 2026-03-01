import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";

import Screen from "./Slider";
import Departments from "./Departments";
import Gallery from "./Gallery";


const Homepage = () => {
  const theme=useTheme()


  const departments = [
    { name: "Anesthesiology And Critical Care" },
    { name: "Clinical Biochemistry" },
    { name: "Department of Dermatology" },
    { name: "Microbiology" },
    { name: "Ophthalmology" },
  ];

  const highlights = [
    {
      title: "24/7 Emergency",
      description: "Always-ready care with a streamlined triage workflow.",
      icon: <AccessTimeRoundedIcon />,
    },
    {
      title: "Expert Clinicians",
      description: "Specialists across key departments for every stage of care.",
      icon: <LocalHospitalRoundedIcon />,
    },
    {
      title: "Secure Records",
      description: "Protected patient data with role-based access control.",
      icon: <VerifiedUserRoundedIcon />,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Screen />

      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.background.default,
            0.7
          )} 0%, ${theme.palette.background.default} 100%)`,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(900px circle at 15% 10%, ${alpha(
              theme.palette.primary.main,
              0.12
            )}, transparent 55%), radial-gradient(700px circle at 85% 30%, ${alpha(
              theme.palette.secondary?.main || theme.palette.primary.main,
              0.09
            )}, transparent 55%)`,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Grid container spacing={3} alignItems="stretch">
            {highlights.map((item) => (
              <Grid key={item.title} item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: "blur(10px)",
                    transition: "transform 160ms ease, box-shadow 160ms ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          color: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          "& svg": { fontSize: 22 },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                        {item.title}
                      </Typography>
                    </Stack>

                    <Typography sx={{ mt: 1.25, color: "text.secondary" }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h2"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1.1,
                  fontSize: { xs: "clamp(1.7rem, 4.6vw, 2.4rem)", md: 40 },
                }}
              >
                A calm, modern experience for patients and staff
              </Typography>
              <Typography sx={{ mt: 1.5, color: "text.secondary", fontSize: 16 }}>
                From booking to reports, everything stays organized and accessible.
                Explore services and find the right specialist for your needs.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/services"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.25,
                    textTransform: "none",
                    fontWeight: 800,
                  }}
                >
                  View services
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/contact"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    px: 3,
                    py: 1.25,
                    textTransform: "none",
                    fontWeight: 800,
                    borderColor: alpha(theme.palette.text.primary, 0.18),
                  }}
                >
                  Contact us
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 5,
                  p: { xs: 2.5, sm: 3 },
                  border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.85),
                  backdropFilter: "blur(10px)",
                }}
              >
                <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                  Departments
                </Typography>
                <Typography sx={{ mt: 0.75, color: "text.secondary" }}>
                  Browse key specialties and find the right care.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  {departments.map((d) => (
                    <Grid key={d.name} item xs={12} sm={6}>
                      <Departments item={d} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 10 },
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, ${alpha(theme.palette.background.default, 1)} 65%)`,
        }}
      >
        <Container maxWidth="lg">
          <Card
            elevation={0}
            sx={{
              borderRadius: 6,
              overflow: "hidden",
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: { xs: 18, md: 22 },
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      fontWeight: 600,
                    }}
                  >
                    “Health is a daily practice. When care feels simple and supportive,
                    it’s easier to stay consistent — one step at a time.”
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: "text.secondary" }}>
                    Patient-first experiences, designed for clarity.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      borderRadius: 5,
                      p: 3,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.12
                      )} 0%, ${alpha(theme.palette.background.paper, 1)} 70%)`,
                      border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                    }}
                  >
                    <Typography sx={{ fontWeight: 900, fontSize: 16 }}>
                      Quick actions
                    </Typography>
                    <Stack spacing={1.25} sx={{ mt: 1.5 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/doctor"
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontWeight: 800,
                        }}
                      >
                        Book appointment
                      </Button>
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to="/ambulance-booking"
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontWeight: 800,
                          borderColor: alpha(theme.palette.text.primary, 0.18),
                        }}
                      >
                        Request ambulance
                      </Button>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1.5}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography component="h2" sx={{ fontWeight: 900, fontSize: 28 }}>
                Gallery
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                A glimpse into our facilities and care environments.
              </Typography>
            </Box>
            <Button
              variant="text"
              component={RouterLink}
              to="/about"
              sx={{ textTransform: "none", fontWeight: 800 }}
            >
              Learn more →
            </Button>
          </Stack>

          <Gallery />
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
