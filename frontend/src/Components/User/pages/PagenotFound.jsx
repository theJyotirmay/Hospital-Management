import React from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { alpha, useTheme } from "@mui/material/styles";
import PageShell from "../layout/PageShell";

const PagenotFound = () => {
  const theme = useTheme();

  return (
    <PageShell
      title="Page not found"
      subtitle="The page you’re looking for doesn’t exist or has moved."
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
          <Stack spacing={2}>
            <Typography sx={{ fontWeight: 950, fontSize: 28 }}>404</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Try going back to the homepage.
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/"
              sx={{ py: 1.2, fontWeight: 900, width: { xs: "100%", sm: "auto" } }}
            >
              Back to Home
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </PageShell>
  );
};

export default PagenotFound;