import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { getservice } from "../slices/getService";
import Loading from "../Loading";
import Image from "mui-image";
import PageShell from "../layout/PageShell";

const ServiceItem = ({ image, title, description, features }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          height: "100%",
          borderRadius: 5,
          border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          overflow: "hidden",
          transition: "transform 180ms ease, box-shadow 180ms ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <CardActionArea onClick={handleOpen} sx={{ height: "100%" }}>
          <CardMedia component="img" height="190" image={image} alt={title} />
          <CardContent sx={{ p: 2.5 }}>
            <Typography sx={{ fontWeight: 900, fontSize: 18 }} gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
            <Button
              variant="text"
              sx={{ mt: 1.5, px: 0, fontWeight: 900 }}
            >
              View details →
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "92vw", sm: 560 },
            maxHeight: { xs: "86vh", sm: "88vh" },
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: 5,
            border: `1px solid ${alpha(theme.palette.text.primary, 0.10)}`,
            boxShadow: theme.shadows[12],
            p: { xs: 2.5, sm: 3.5 },
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              }}
            >
              <Image src={image} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 950, fontSize: 22 }} gutterBottom>
                {title}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>{description}</Typography>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>Features</Typography>
              <Box component="ul" sx={{ pl: 2, m: 0, color: "text.secondary" }}>
                {features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

const OurServicesPage = () => {
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.service);
  const { service, isLoading, error } = datas;

  useEffect(() => {
    dispatch(getservice());
  }, [dispatch]);

  return (
    <>
      <Loading isloading={isLoading} />
      <PageShell
        title="Our Services"
        subtitle="Explore departments and services designed around patient-first care."
      >
        <Grid container spacing={2.5}>
          {service?.user_service?.map((svc, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceItem
                image={svc.image}
                title={svc.title}
                description={svc.description}
                features={svc.features}
                price={svc.price}
              />
            </Grid>
          ))}
        </Grid>
      </PageShell>
    </>
  );
};

export default OurServicesPage;
