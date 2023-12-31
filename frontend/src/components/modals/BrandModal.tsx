import { FC } from "react";
import { ModalProps } from "../../interfaces/interfaces";
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
import { useAddBrand } from "../../hooks/useBrands";
import { Brand } from "../../models/brandTypes.ts";

const BrandModal: FC<ModalProps> = ({ open, setOpen }) => {
  const { control, handleSubmit } = useForm<Brand>({
    defaultValues: {
      brand: "",
    },
  });
  const { addBrand } = useAddBrand();

  const handleClose = (_: Object, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const onSubmit = (data: FieldValues) => {
    addBrand(data.brand);
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
                name={"brand"}
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
