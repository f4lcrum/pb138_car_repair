import React, { FC } from "react";
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
import { Fault } from "../../types/types";
import ControlledTextField from "../ControlledTextField";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

interface FaultModalProps {
  open: boolean;
  setOpen: (open: boolean) => {};
  fault?: Fault;
}

const FaultModal: FC<FaultModalProps> = (props) => {
  const { open, setOpen, fault } = props;
  const { control } = useForm<Fault>(fault);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{!fault ? "New Fault" : "Fault Details"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ marginTop: 2 }} workPrice>
          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={fault?.name ?? ""}
              label={"Fault Name"}
              name={"name"}
              control={control}
              disabled={!!fault?.repairedAt}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={fault?.mileage ?? 0}
              label={"Mileage (km)"}
              name={"mileage"}
              control={control}
              type={"number"}
              disabled={!!fault?.repairedAt}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={fault?.description ?? ""}
              label={"Description"}
              name={"description"}
              control={control}
              multiline={true}
              disabled={!!fault?.repairedAt}
            />
          </Grid>

          {/* Only Technician can modify this fields */}

          <Grid item xs={12}>
            <ControlledTextField
              defaultValue={fault?.workPrice ?? 0}
              label={"Work price (€)"}
              name={"workPrice"}
              control={control}
              type={"number"}
              disabled={!!fault?.repairedAt}
            />
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell>Price (€)</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {fault?.materials?.map((material) => (
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
            <FormControlLabel label="Mark as resolved" control={<Checkbox />} />
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
            console.log(fault);
            setOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FaultModal;
