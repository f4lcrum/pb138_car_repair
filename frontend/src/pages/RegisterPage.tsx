import { FC } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import ControlledTextField from "../components/ControlledTextField";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services";

//todo add validation (password.length >= 8)

const RegisterPage: FC = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  //todo add authService in front of register
  const onSubmit = (data: FieldValues) => {
    authApi
      .register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: "721440633",
        password: data.password,
      })
      .then(() => {
        navigate("/");
      })
      .catch();
  };

  //todo add phonenumber
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Grid item>
            <Button type="submit" variant="outlined">
              Register
            </Button>
            <Button onClick={() => navigate("/login")} variant="outlined">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterPage;
