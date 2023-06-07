import { FC } from "react";
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
import { FieldValues, useForm } from "react-hook-form";
import { Brand } from "../../types/types";
import { useAddBrand } from "../../hooks/useBrands";

const BrandModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm<Brand>({});
  const { addBrand } = useAddBrand();

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    addBrand(data.name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Brand</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
          <Button variant={"contained"} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BrandModal;
