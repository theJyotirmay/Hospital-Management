import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

export default function PageShell({
  title,
  subtitle,
  actions,
  maxWidth = "lg",
  children,
}) {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        py: { xs: 4, md: 6 },
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.primary.main,
          0.06
        )} 0%, ${theme.palette.background.default} 55%)`,
      }}
    >
      <Container maxWidth={maxWidth}>
        {(title || subtitle || actions) && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: { xs: 3, md: 4 } }}
          >
            <Box>
              {title && (
                <Typography
                  component="h1"
                  sx={{
                    fontWeight: 950,
                    lineHeight: 1.1,
                    fontSize: { xs: 28, sm: 34, md: 40 },
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography sx={{ mt: 1, color: "text.secondary" }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {actions && <Box sx={{ width: { xs: "100%", sm: "auto" } }}>{actions}</Box>}
          </Stack>
        )}

        {children}
      </Container>
    </Box>
  );
}
