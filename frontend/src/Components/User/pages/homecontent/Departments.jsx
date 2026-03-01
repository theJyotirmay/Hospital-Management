import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
export default function Departments({ item }) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardActionArea
        component={RouterLink}
        to="/services"
        sx={{ height: "100%", borderRadius: 4, alignItems: "stretch" }}
      >
        <CardContent sx={{ p: 2.25 }}>
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                "& svg": { fontSize: 18 },
                flex: "0 0 auto",
              }}
            >
              <MedicalServicesRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 1,
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            Learn more about consultations and available services.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}