import React, { FC } from "react";
import { ModalProps } from "../../types/interfaces";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { useForm } from "react-hook-form";
import { Brand } from "../../types/types";

const BrandModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control } = useForm<Brand>({});
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Brand</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
          <Grid item xs={12}>
            <ControlledTextField
              label={"Brand Name"}
              name={"name"}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BrandModal;
