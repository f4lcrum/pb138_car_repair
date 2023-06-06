import { FC, useEffect, useState } from "react";
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
import { AuthInfo } from "../../models/authTypes";
import { authApi, userApi } from "../../services";

interface UserModalProps {
  open: boolean;
  setOpen: (open: boolean) => {};
}

const UserModal: FC<UserModalProps> = ({ open, setOpen }) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | undefined>(undefined);

  useEffect(() => {
    authApi.readAuth().then((response) => {
      setAuthInfo(response.data);
    });
  }, [open]);

  const { control, handleSubmit } = useForm<User>();

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    if (authInfo?.item.id) {
      userApi
        .updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
        })
        .then(() => {
          setOpen(false);
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
            <Grid item xs={12}>
              <ControlledTextField
                label={"E-mail"}
                name={"email"}
                control={control}
                disabled={true}
                defaultValue={authInfo?.item.email}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"First Name"}
                name={"firstName"}
                control={control}
                defaultValue={authInfo?.item.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Last Name"}
                name={"lastName"}
                control={control}
                defaultValue={authInfo?.item.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Phone Number"}
                name={"phoneNumber"}
                control={control}
                defaultValue={authInfo?.item.phoneNumber}
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
