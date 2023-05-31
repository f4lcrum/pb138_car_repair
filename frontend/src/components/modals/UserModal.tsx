import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { User, UserRole } from "../../types/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";

interface UserModalProps {
  open: boolean;
  setOpen: (open: boolean) => {};
}

const todoGetLoggedUser = () => {
  const user: User = {
    id: 1,
    email: "tomas@jedno.cz",
    firstName: "Tomáš",
    lastName: "Jedno",
    phoneNumber: "+420234201444",
    role: UserRole.Customer,
  };

  return user;
};

const UserModal: FC<UserModalProps> = ({ open, setOpen }) => {
  const { control } = useForm<User>({
    defaultValues: todoGetLoggedUser(),
  });

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
          <Grid item xs={12}>
            <ControlledTextField
              label={"E-mail"}
              name={"email"}
              control={control}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              label={"First Name"}
              name={"firstName"}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              label={"Last Name"}
              name={"lastName"}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              label={"Phone Number"}
              name={"phoneNumber"}
              control={control}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={"outlined"} onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          variant={"contained"}
          onClick={() => {
            setOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
