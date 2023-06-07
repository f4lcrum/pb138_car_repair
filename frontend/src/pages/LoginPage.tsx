import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import { useNavigate } from "react-router-dom";
import { useLogIn } from "../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Credentials } from "../models/authTypes";
import {
  invalidEmail,
  requiredField,
  shortPassword,
} from "../constants/authValidations";

const validationScheme = yup.object({
  email: yup.string().email(invalidEmail).required(requiredField),
  password: yup.string().min(8, shortPassword).required(requiredField),
});

const LoginPage: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(validationScheme),
  });
  const navigate = useNavigate();
  const { logIn } = useLogIn(navigate);

  const onSubmit = (values: FieldValues) => {
    logIn({ email: values.email, password: values.password });
    //todo add reset
  };

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
            <Typography variant="subtitle1">Login</Typography>
          </Grid>
          <Grid item>
            <>
              <ControlledTextField
                id="email"
                name="email"
                control={control}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </>
          </Grid>
          <Grid item>
            <ControlledTextField
              id="password"
              name="password"
              control={control}
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined">
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
