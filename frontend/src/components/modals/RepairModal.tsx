import { FC, useState } from "react";
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
import { ModalProps } from "../../interfaces/interfaces";
import { RepairWithTechnician } from "../../models/repairTypes";
import { useAddRepair, useUpdateRepair } from "../../hooks/useRepairs";
import { useAuth } from "../../hooks/useAuth.ts";
import { Role } from "../../models/authTypes.ts";

const RepairModal: FC<
  ModalProps & { repair?: RepairWithTechnician; vehicleId?: string }
> = ({ open, setOpen, repair, vehicleId }) => {
  const { control, handleSubmit } = useForm<RepairWithTechnician>({
    defaultValues: {
      name: repair?.name ?? "",
      description: repair?.description ?? "",
      workPrice: repair?.workPrice ?? 0,
      mileage: repair?.mileage ?? 0,
      material: repair?.material ?? [],
    },
  });
  const { addRepair } = useAddRepair(repair?.vehicleId ?? vehicleId ?? "-1");
  const { updateRepair } = useUpdateRepair();
  const { data } = useAuth();
  const [resolved, setResolved] = useState(false);

  const [newMaterial, setNewMaterial] = useState("");
  const [newMaterialPrice, setNewMaterialPrice] = useState(0);
  const [renderer, setRenderer] = useState(false);

  const handleClose = (_: Object, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleAddMaterial = () => {
    if (repair) {
      if (!repair.material) {
        repair.material = [{ name: newMaterial, price: newMaterialPrice }];
      } else {
        repair.material = [
          ...repair.material,
          { name: newMaterial, price: newMaterialPrice },
        ];
      }

      setNewMaterial("");
      setNewMaterialPrice(0);
    }
  };

  const handleDeleteMaterial = (index: number) => {
    if (repair) {
      repair.material = [...repair.material.filter((_, i) => i !== index)];
      setRenderer(!renderer);
    }
  };

  const onSubmit = (event: FieldValues) => {
    const newVehicleId = repair?.vehicleId ?? vehicleId ?? "-1";

    if (repair) {
      updateRepair({
        id: repair.id,
        repair: {
          name: event.name,
          resolvedAt: resolved ? new Date() : undefined,
          description: event.description,
          workPrice: event.workPrice,
          mileage: event.mileage,
          material: repair.material,
        },
      });
    } else {
      addRepair({
        vehicleId: newVehicleId,
        repair: {
          name: event.name,
          description: event.description,
          mileage: event.mileage,
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
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Fault Name"}
                name={"name"}
                control={control}
                disabled={
                  !!repair &&
                  (!!repair?.resolvedAt || data?.item.role !== Role.TECHNICIAN)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Mileage (km)"}
                name={"mileage"}
                control={control}
                type={"number"}
                disabled={
                  !!repair &&
                  (!!repair?.resolvedAt || data?.item.role !== Role.TECHNICIAN)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <ControlledTextField
                label={"Description"}
                name={"description"}
                control={control}
                multiline
                rows={4}
                disabled={
                  !!repair &&
                  (!!repair?.resolvedAt || data?.item.role !== Role.TECHNICIAN)
                }
              />
            </Grid>

            {!!repair && (
              <>
                <Grid item xs={12}>
                  <ControlledTextField
                    label={"Work price (€)"}
                    name={"workPrice"}
                    control={control}
                    type={"number"}
                    disabled={
                      !!repair?.resolvedAt ||
                      data?.item.role !== Role.TECHNICIAN
                    }
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
                      {repair?.material &&
                        Array.from(repair?.material).map((material, index) => (
                          <TableRow key={index}>
                            <TableCell>{material?.name}</TableCell>
                            <TableCell>{material?.price}</TableCell>
                            <TableCell>
                              {data?.item.role === Role.TECHNICIAN && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteMaterial(index)}
                                >
                                  <CloseIcon color={"primary"} />
                                </IconButton>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      {!repair?.resolvedAt &&
                        data?.item.role === Role.TECHNICIAN && (
                          <TableRow>
                            <TableCell>
                              <ControlledTextField
                                label={"New Material Name"}
                                name={"newMaterialName"}
                                control={control}
                                variant={"standard"}
                                value={newMaterial}
                                onChange={(event) =>
                                  setNewMaterial(event.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <ControlledTextField
                                label={"New Material Price"}
                                name={"newMaterialPrice"}
                                control={control}
                                variant={"standard"}
                                type="number"
                                value={newMaterialPrice}
                                onChange={(event) =>
                                  setNewMaterialPrice(+event.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant={"outlined"}
                                onClick={handleAddMaterial}
                              >
                                Add
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>

                {!repair.resolvedAt && data?.item.role === Role.TECHNICIAN && (
                  <Grid item>
                    <FormControlLabel
                      label="Mark as resolved"
                      control={
                        <Checkbox
                          checked={resolved}
                          onChange={() => setResolved(!resolved)}
                        />
                      }
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={() => setOpen(false)}>
            Close
          </Button>
          {(!repair || (!!repair && data?.item.role === Role.TECHNICIAN)) && (
            <Button variant={"contained"} type="submit">
              Save
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RepairModal;
