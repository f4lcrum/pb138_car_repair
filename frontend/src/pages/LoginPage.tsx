import { FC, useState } from "react";
import { Button, Grid, Typography, Link } from "@mui/material";
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
import styles from "./login.module.css";
import Logo from "./Logo";

const validationScheme = yup.object({
  email: yup.string().email(invalidEmail).required(requiredField),
  password: yup.string().min(8, shortPassword).required(requiredField),
});

const LoginPage: FC = () => {
  const [showFailure, setShowFailure] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(validationScheme),
  });
  const navigate = useNavigate();
  const { logIn } = useLogIn(navigate, setShowFailure);

  const onSubmit = (values: FieldValues) => {
    logIn({ email: values.email, password: values.password });
  };

  return (
    <>
      <Logo />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.backgroundDiv}>
        <Grid
          container
          position="relative"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h4" color="primary">
              <strong>LogIn</strong>
            </Typography>
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
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography fontSize={12}>
              Do not have an account?{" "}
              <Link component="button" onClick={() => navigate("/register")}>
                Create one here
              </Link>
            </Typography>
          </Grid>
          {showFailure && (
            <Typography variant="h4" color="primary">
              Invalid credentials
            </Typography>
          )}
        </Grid>
      </form>
    </>
  );
};

export default LoginPage;
