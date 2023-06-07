import { FC, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
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
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ControlledTextField from "../ControlledTextField";
import { useAddModel, useBrands } from "../../hooks/useBrands";
import { BrandModel } from "../../models/brandTypes";

const ModelModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm<BrandModel>({});
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  //todo do something with the error
  const { data, error, isLoading } = useBrands();
  const { addModel } = useAddModel();

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBrand(event.target.value);
  };

  const onSubmit = (values: FieldValues) => {
    addModel({ brandId: selectedBrand, model: { name: values.name } });
    setOpen(false);
  };

  return (
    <>
      {!isLoading && (
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Model</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                <FormControl fullWidth sx={{ marginTop: 2, marginLeft: 2 }}>
                  <InputLabel>Brand</InputLabel>
                  <Controller
                    name="name"
                    control={control}
                    render={() => (
                      <Select
                        value={selectedBrand}
                        label="Type"
                        onChange={handleChange}
                      >
                        {data &&
                          Array.from(data).map((brand) => (
                            <MenuItem key={brand.id} value={brand.id}>
                              {brand.brand}
                            </MenuItem>
                          ))}
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
              <Button variant={"contained"} type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default ModelModal;
