import { FC, useState } from "react";
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
import { useRegistration } from "../hooks/useAuth";

//todo add validation (password.length >= 8)

const RegisterPage: FC = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { register } = useRegistration();

  const [isTechnician, setIsTechnician] = useState(false);

  const onSubmit = (data: FieldValues) => {
    register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      isTechnician: isTechnician,
    });
    navigate("/");
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
              id="phoneNumber"
              name="phoneNumber"
              control={control}
              label="Phone Number"
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
                  checked={isTechnician}
                  onChange={() => setIsTechnician(!isTechnician)}
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
