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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Registration } from "../models/authTypes";
import {
  invalidEmail,
  nonmatchingPassword,
  requiredField,
  shortPassword,
} from "../constants/authValidations";

const validationScheme = yup.object({
  email: yup.string().email(invalidEmail).required(requiredField),
  firstName: yup.string().required(requiredField),
  lastName: yup.string().required(requiredField),
  phoneNumber: yup.string().required(requiredField),
  password: yup.string().min(8, shortPassword).required(requiredField),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], nonmatchingPassword)
    .required(requiredField),
});

const RegisterPage: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>({
    resolver: yupResolver(validationScheme),
  });
  const navigate = useNavigate();
  const { register } = useRegistration(navigate);

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
            <Typography variant="subtitle1">Register</Typography>
          </Grid>
          <Grid item>
            <ControlledTextField
              name="email"
              control={control}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="firstName"
              name="firstName"
              control={control}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="lastName"
              name="lastName"
              control={control}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item>
            <ControlledTextField
              id="phoneNumber"
              name="phoneNumber"
              control={control}
              label="Phone Number"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
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
            <ControlledTextField
              id="repeatPassword"
              name="repeatPassword"
              control={control}
              label="Repeat password"
              type="password"
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
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
