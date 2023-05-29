import React, { FC } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import ControlledTextField from "../components/ControlledTextField";
import { useForm } from "react-hook-form";

const RegisterPage: FC = () => {
  const { handleSubmit, control } = useForm();
  return (
    <>
      <form>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="subtitle1">Register</Typography>
          </Grid>
          <Grid item>
            <ControlledTextField name="email" control={control} label="Email" />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="firstName"
              name="firstName"
              control={control}
              label="First Name"
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="lastName"
              name="lastName"
              control={control}
              label="Last Name"
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="password"
              name="password"
              control={control}
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="repeatPassword"
              name="repeatPassword"
              control={control}
              label="Repeat password"
              type="password"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              label="Register as a technician"
              control={
                <Checkbox
                  checked={false}
                  indeterminate={false}
                  onChange={undefined}
                />
              }
            />
          </Grid>
          <Grid item onClick={handleSubmit}>
            <Button variant="outlined">register</Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterPage;
