import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Vehicle } from "../../types/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { ModalProps } from "../../types/interfaces";

export const getBrands = () => {
  return [
    {
      name: "BMW",
      models: [
        { id: 1, name: "M1" },
        { id: 2, name: "M2" },
        { id: 3, name: "M3" },
      ],
    },
    {
      name: "Hummer",
      models: [
        { id: 4, name: "H1" },
        { id: 5, name: "H2" },
        { id: 6, name: "H3" },
      ],
    },
  ];
};

const VehicleModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control } = useForm<Vehicle>({});

  const getModelMenuItems = (brand) => {
    return brand.models.map((model) => (
      <MenuItem key={model.id}>{model.name}</MenuItem>
    ));
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Vehicle</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={""}
              label={"License Plate"}
              name={"licensePlate"}
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={""}
              label={"Win Code"}
              name={"winCode"}
              control={control}
            />
          </Grid>
          <FormControl fullWidth sx={{ marginTop: 2, marginLeft: 2 }}>
            <InputLabel>Model</InputLabel>
            <Select value={undefined} label="Type">
              {getBrands().map((brand) => [
                <ListSubheader key={brand.name}>{brand.name}</ListSubheader>,
                ...getModelMenuItems(brand),
              ])}
            </Select>
          </FormControl>
          <Grid item xs={12}>
            Todo: date
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

export default VehicleModal;
