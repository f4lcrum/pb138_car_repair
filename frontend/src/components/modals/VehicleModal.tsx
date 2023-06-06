import { FC, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
  SelectChangeEvent,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { ModalProps } from "../../types/interfaces";
import { useBrands } from "../../hooks/useBrands";
import { Brand } from "../../models/brandTypes";
import { useAddVehicle } from "../../hooks/useVehicles";

const VehicleModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm<Vehicle>({});
  //todo do something with the error
  const { data, error, isLoading } = useBrands();
  const { addVehicle } = useAddVehicle();
  const [selectedModel, setSelectedModel] = useState<string>("");

  const getModelMenuItems = (brand: Brand) => {
    return brand.models.map((model) => (
      <MenuItem key={model.id} value={model.id}>
        {model.name}
      </MenuItem>
    ));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
    console.log(selectedModel);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  //todo add date field
  const onSubmit = (values: FieldValues) => {
    const request = {
      licensePlate: values.licensePlate,
      vinCode: values.vinCode,
      manufacturedAt: new Date(1988, 4),
      brandId: selectedModel ?? "",
    };
    console.log(request);
    addVehicle(request);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                label={"Vin Code"}
                name={"vinCode"}
                control={control}
              />
            </Grid>
            <FormControl fullWidth sx={{ marginTop: 2, marginLeft: 2 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={selectedModel}
                label="Type"
                onChange={handleSelectChange}
              >
                {!isLoading &&
                  data &&
                  Array.from(data).map((brand) => [
                    // is this key safe?
                    <ListSubheader key={brand.brand}>
                      {brand.brand}
                    </ListSubheader>,
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
          <Button variant={"contained"} type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VehicleModal;
