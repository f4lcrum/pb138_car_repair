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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  invalidPhoneNumber,
  phoneRegex,
  requiredField,
} from "../../constants/authValidations";

const validationSchema = yup.object({
  firstName: yup.string().required(requiredField),
  lastName: yup.string().required(requiredField),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, invalidPhoneNumber)
    .required(requiredField),
});

interface UserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UserModal: FC<UserModalProps> = ({ open, setOpen }) => {
  const { data } = useAuth();
  const { update } = useUpdateUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: data?.item.email,
      firstName: data?.item.firstName,
      lastName: data?.item.lastName,
      phoneNumber: data?.item.phoneNumber,
    },
  });

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
        <DialogTitle>
          Profile
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Last Name"}
                name={"lastName"}
                control={control}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Phone Number"}
                name={"phoneNumber"}
                control={control}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
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
