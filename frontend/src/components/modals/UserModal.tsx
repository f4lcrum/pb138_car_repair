import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "../../types/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { useAuth, useUpdateUser } from "../../hooks/useAuth";

interface UserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserModal: FC<UserModalProps> = ({ open, setOpen }) => {
  const { data } = useAuth();
  const { update } = useUpdateUser();

  const { control, handleSubmit } = useForm<User>();

  const handleClose = (_: Object, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    update({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <ControlledTextField
                label={"E-mail"}
                name={"email"}
                control={control}
                disabled={true}
                defaultValue={data?.item.email}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"First Name"}
                name={"firstName"}
                control={control}
                defaultValue={data?.item.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Last Name"}
                name={"lastName"}
                control={control}
                defaultValue={data?.item.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Phone Number"}
                name={"phoneNumber"}
                control={control}
                defaultValue={data?.item.phoneNumber}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant={"contained"} type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserModal;
