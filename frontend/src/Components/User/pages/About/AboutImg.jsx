import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { alpha } from "@mui/material/styles";
import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';
import img3 from './img/img3.jpg';

const images = [img1, img2, img3];

const StyledSliderArea = styled("div")`
  margin: 0;
  position: relative;
  background-image: ${({ currentIndex }) => `url(${images[currentIndex]})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  height: 72vh;
  overflow: hidden;
  

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  
`;

const StyledHeroCaption = styled("div")`
  text-align: left;
`;

const AboutImage = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <StyledSliderArea currentIndex={currentIndex}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      <Container>
        <Grid container sx={{ position: "relative" }}>
          <Grid item xs={12} sm={9} md={8} lg={9} xl={7}>
            <StyledHeroCaption>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "common.white",
                  fontSize: { xs: 34, sm: 42, md: 52 },
                  fontWeight: 950,
                  letterSpacing: -0.5,
                }}
              >
                About Us
              </Typography>

              <Typography
                variant="body1"
                data-animation="fadeInLeft"
                data-delay="0.1s"
                sx={{
                  mt: 1.5,
                  fontSize: { xs: 16, sm: 18, md: 20 },
                  color: alpha("#fff", 0.88),
                  lineHeight: 1.7,
                }}
              >
                Efficient hospital management system streamlining
                operations, enhancing patient care, and optimizing resource
                allocation
              </Typography>
            </StyledHeroCaption>
          </Grid>
        </Grid>
      </Container>
    </StyledSliderArea>
  );
};

export default AboutImage;
