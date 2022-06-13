import { Grid } from "@mui/material";
import React from "react";

export function GridContainer({ children }) {
  return (
    <Grid component="ul" padding={0} container spacing={2} marginTop={2}>
      {children}
    </Grid>
  );
}
