import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import img from "../../assets/h1_hero.png";

const StyledSliderArea = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.background.default,
      0.88
    )} 0%, ${alpha(theme.palette.background.default, 0.45)} 55%, ${alpha(
      theme.palette.background.default,
      0.2
    )} 100%)`,
  },
}));

const AnimatedSpan = styled("span")(({ theme }) => ({
  display: "inline-block",
  position: "relative",
  whiteSpace: "nowrap",
  color: theme.palette.primary.main,
  animation: "fade-in 2s ease-in-out infinite",
  "@keyframes fade-in": {
    "0%": { opacity: 0, transform: "translateY(6px)" },
    "35%": { opacity: 1, transform: "translateY(0)" },
    "100%": { opacity: 0, transform: "translateY(-6px)" },
  },
}));

const Screen = () => {
  const words = ["health", "care", "wellbeing"]; // keep it healthcare-focused
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const currentWord = words[currentIndex];

  return (
    <StyledSliderArea component="section" aria-label="Homepage hero">
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          py: { xs: 10, md: 14 },
        }}
      >
        <Box sx={{ maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{
              letterSpacing: 2,
              color: "text.secondary",
              fontWeight: 700,
            }}
          >
            Pankaj's Hospital
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1.25,
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: {
                xs: "clamp(2.25rem, 6vw, 3.2rem)",
                md: "clamp(3rem, 4.6vw, 4rem)",
              },
              color: "text.primary",
            }}
          >
            We care about your <AnimatedSpan>{currentWord}</AnimatedSpan>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 16, sm: 18, md: 20 },
              color: "text.secondary",
              maxWidth: 640,
            }}
          >
            Efficient hospital management system streamlining operations,
            enhancing patient care, and optimizing resource allocation.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 3.5, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              to="/doctor"
              size="large"
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1.25,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Book an appointment
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/services"
              size="large"
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1.25,
                textTransform: "none",
                fontWeight: 700,
                backgroundColor: (theme) =>
                  alpha(theme.palette.background.default, 0.35),
                borderColor: (theme) => alpha(theme.palette.text.primary, 0.18),
              }}
            >
              Explore services
            </Button>
          </Stack>
        </Box>
      </Container>
    </StyledSliderArea>
  );
};

export default Screen;

