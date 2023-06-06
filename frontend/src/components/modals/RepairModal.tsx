import { FC, useRef } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ControlledTextField from "../ControlledTextField";
import { FieldValues, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { ModalProps } from "../../types/interfaces";
import { RepairWithTechnician } from "../../models/repairTypes";
import { useAddRepair, useUpdateRepair } from "../../hooks/useRepairs";

const RepairModal: FC<
  ModalProps & { repair?: RepairWithTechnician; vehicleId: string }
> = ({ open, setOpen, repair, vehicleId }) => {
  const { control, handleSubmit } = useForm<RepairWithTechnician>();
  const descriptionRef = useRef(null);
  const { addRepair } = useAddRepair(vehicleId);
  const { updateRepair } = useUpdateRepair(vehicleId);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  //todo change date
  //todo update description as well
  //todo add material
  const onSubmit = (event: FieldValues) => {
    if (repair) {
      //todo currently not working
      updateRepair({
        id: repair.id,
        repair: {
          name: event.name,
          resolvedAt: new Date(2001, 5),
          workPrice: event.workPrice,
          mileage: +event.mileage,
        },
      });
    } else {
      addRepair({
        vehicleId: vehicleId,
        repair: {
          name: event.name,
          description: event.description,
          mileage: +event.mileage,
        },
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{!repair ? "New Fault" : "Fault Details"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
            <Grid item xs={12}>
              <ControlledTextField
                defaultValue={repair?.name ?? ""}
                label={"Fault Name"}
                name={"name"}
                control={control}
                disabled={!!repair?.resolvedAt}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                defaultValue={repair?.mileage ?? 0}
                label={"Mileage (km)"}
                name={"mileage"}
                control={control}
                type={"number"}
                disabled={!!repair?.resolvedAt}
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                ref={descriptionRef}
                defaultValue={repair?.description ?? ""}
                label={"Description"}
                name={"description"}
                control={control}
                multiline
                rows={4}
                disabled={!!repair?.resolvedAt}
              />
            </Grid>

            {/* Only Technician can modify this fields */}

            {!!repair && (
              <>
                <Grid item xs={12}>
                  <ControlledTextField
                    defaultValue={repair?.workPrice ?? 0}
                    label={"Work price (€)"}
                    name={"workPrice"}
                    control={control}
                    type={"number"}
                    disabled={!!repair?.resolvedAt}
                  />
                </Grid>

                <TableContainer sx={{ paddingLeft: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Material</TableCell>
                        <TableCell>Price (€)</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {repair?.materials?.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>{material?.name}</TableCell>
                          <TableCell>{material?.price}</TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <CloseIcon color={"primary"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <ControlledTextField
                            label={"New Material Name"}
                            name={"newMaterialName"}
                            control={control}
                            variant={"standard"}
                          />
                        </TableCell>
                        <TableCell>
                          <ControlledTextField
                            label={"New Material Price"}
                            name={"newMaterialPrice"}
                            control={control}
                            variant={"standard"}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant={"outlined"}>Add</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item>
                  <FormControlLabel
                    label="Mark as resolved"
                    control={<Checkbox />}
                  />
                </Grid>
              </>
            )}
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

export default RepairModal;
