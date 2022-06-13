import { Grid } from "@mui/material";
import React from "react";

import styles from "./GridContainer.module.scss";

export function GridContainer({ children }) {
  return (
    // <ul
    //   className={styles.GridContainer}
    //   style={{
    //     "--col-count": columns,
    //   }}
    // >
    //   {children}
    // </ul>
    <Grid
      component="ul"
      container
      spacing={2}
      marginTop={2}
      className={styles.GridContainer}
    >
      {children}
    </Grid>
  );
}
