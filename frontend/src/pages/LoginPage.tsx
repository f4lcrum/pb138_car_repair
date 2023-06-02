import React, { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
  const { control } = useForm();
  const navigate = useNavigate();
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
            <Typography variant="subtitle1">Login</Typography>
          </Grid>
          <Grid item>
            <ControlledTextField
              id="email"
              name="email"
              control={control}
              label="Email"
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
            <Button onClick={() => navigate("/")} variant="outlined">
              Login
            </Button>
            <Button onClick={() => navigate("/register")} variant="outlined">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
