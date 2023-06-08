import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import styles from "./logo.module.css";

const Logo: FC = () => {
  return (
    <Grid
      container
      direction="column"
      className={styles.mainGrid}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Grid item className={styles.title}>
            <CarRepairIcon color="primary" fontSize="inherit" />
          </Grid>
          <Grid item className={styles.title}>
            <Typography fontSize="inherit" color="primary">
              <strong>Car Service</strong>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography textAlign="center" color="primary">
          <i>
            Get your cars online. We got it covered for you... Possibly
          </i>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Logo;
