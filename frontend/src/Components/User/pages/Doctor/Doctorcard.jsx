import * as React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function DoctorCard({item}) {
  const theme = useTheme();
  const { expertise, name, image, desc } = item;
    
  return (
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
      <CardMedia
      sx={{ backgroundSize: "cover",
        backgroundPosition: "center"
         }}
         height="190"
        image={image}
        title={name}
        component='img'
      />
      <CardContent>
        <Typography sx={{ fontWeight: 950, fontSize: 18 }} gutterBottom>
          {name}
        </Typography>

        {Array.isArray(expertise) && expertise.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
            {expertise.slice(0, 2).map((e) => (
              <Chip
                key={e}
                label={e}
                size="small"
                sx={{
                  fontWeight: 800,
                  bgcolor: alpha(theme.palette.primary.main, 0.10),
                }}
              />
            ))}
          </Stack>
        )}

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
          {desc || "Book a consultation and get expert guidance tailored to your needs."}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ px: 1, pb: 1 }}>
          <Button
            size="small"
            variant="contained"
            as={Link}
            to={`/form/${item._id}`}
            sx={{ fontWeight: 900 }}
          >
            Book appointment
          </Button>
        </Box>
        
      </CardActions>
    </Card>
  );
}