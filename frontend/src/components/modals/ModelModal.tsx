import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ModalProps } from "../../types/interfaces";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { Brand, Model } from "../../types/types";
import { getBrands } from "./VehicleModal";

const ModelModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control } = useForm<Model>({});
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Model</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
          <FormControl fullWidth sx={{ marginTop: 2, marginLeft: 2 }}>
            <InputLabel>Model</InputLabel>
            <Controller
              name="brand"
              id="brand"
              control={control}
              render={({ field }) => (
                <Select value={undefined} label="Type" {...field}>
                  {(getBrands() as Brand[]).map((brand) => [
                    <MenuItem key={brand}>{brand.name}</MenuItem>,
                  ])}
                </Select>
              )}
            />
          </FormControl>
          <Grid item xs={12}>
            <ControlledTextField
              label={"Name"}
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

export default ModelModal;
