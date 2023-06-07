import { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RepairModal from "../../components/modals/RepairModal";
import FaultTable from "../../components/tables/FaultTable";
import { VehicleWithBrand } from "../../models/vehicleTypes";
import { format } from "date-fns";
import { RepairWithTechnician } from "../../models/repairTypes";
import { useRemoveVehicle } from "../../hooks/useVehicles";
import ConfirmModal from "../../components/modals/ConfirmModal.tsx";

const VehicleListPageRow = (props: { vehicle: VehicleWithBrand }) => {
  const { vehicle } = props;
  const [open, setOpen] = useState(false);
  const [faultModalOpen, setFaultModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<
    RepairWithTechnician | undefined
  >(undefined);
  const { removeVehicle } = useRemoveVehicle();

  const handleRemove = () => {
    removeVehicle(vehicle.id);
  };

  return (
    <>
      <TableRow key={vehicle.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            onClick={() => setOpen(!open)}
            aria-label="expand row"
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{vehicle.brandName}</TableCell>
        <TableCell>{vehicle.brandModel}</TableCell>
        <TableCell>{vehicle.licensePlate}</TableCell>
        <TableCell>
          {format(new Date(vehicle.manufacturedAt), "yyyy")}
        </TableCell>
        <TableCell align={"right"}>
          <Button
            variant={"contained"}
            onClick={() => {
              setSelectedRepair(undefined);
              setFaultModalOpen(true);
            }}
          >
            Add repair
          </Button>
          <Button
            sx={{ margin: 0.5 }}
            variant="outlined"
            onClick={() => setConfirmModalOpen(true)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={vehicle.id + "_repairs"}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Faults
              </Typography>
              <FaultTable
                vehicleId={vehicle.id}
                setRepair={setSelectedRepair}
                setModalOpen={setFaultModalOpen}
                size={"small"}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <RepairModal
        open={faultModalOpen}
        setOpen={setFaultModalOpen}
        repair={selectedRepair}
        vehicleId={vehicle.id}
      />
      <ConfirmModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        text={
          "Do you really want to delete your vehicle " +
          vehicle.brandModel +
          " with license plate " +
          vehicle.licensePlate +
          "?"
        }
        confirmAction={handleRemove}
      />
    </>
  );
};

export default VehicleListPageRow;
