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
import { DatePicker } from "@mui/x-date-pickers";

const VehicleModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm<Vehicle>({});
  const { data, isLoading } = useBrands();
  const { addVehicle } = useAddVehicle();
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [manufacturedAt, setManufacturedAt] = useState<Date>(new Date(2000));

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

  const handleClose = (_: Object, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  //todo add date field
  const onSubmit = (values: FieldValues) => {
    addVehicle({
      licensePlate: values.licensePlate,
      vinCode: values.vinCode,
      manufacturedAt: manufacturedAt,
      brandId: selectedModel ?? "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>New Vehicle</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                    <ListSubheader key={brand.id}>{brand.brand}</ListSubheader>,
                    ...getModelMenuItems(brand),
                  ])}
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <DatePicker
                label="Year of manufacture"
                openTo="year"
                views={["year"]}
                value={manufacturedAt}
                sx={{ width: "100%" }}
                onChange={(change) => {
                  if (change != null) setManufacturedAt(change);
                }}
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

export default VehicleModal;
