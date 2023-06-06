import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import ControlledTextField from "../components/ControlledTextField";
import { useNavigate } from "react-router-dom";
import { useLogIn } from "../hooks/useAuth";

//todo add validation

const LoginPage: FC = () => {
  const { control, handleSubmit } = useForm();
  const { logIn } = useLogIn();
  const navigate = useNavigate();

  //todo not sure about the type
  const onSubmit = (data: FieldValues) => {
    logIn({ email: data.email, password: data.password });
    navigate("/");
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
