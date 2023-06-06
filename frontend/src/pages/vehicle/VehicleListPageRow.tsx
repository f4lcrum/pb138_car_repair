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

const VehicleListPageRow = (props: { vehicle: VehicleWithBrand }) => {
  const { vehicle } = props;
  const [open, setOpen] = useState(false);
  const [faultModalOpen, setFaultModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<
    RepairWithTechnician | undefined
  >(undefined);
  const { removeVehicle } = useRemoveVehicle();

  const handleRemove = () => {
    removeVehicle(vehicle.id);
  };

  return (
    <>
      {/* is the key ok? */}
      <TableRow key={Math.random()} sx={{ "& > *": { borderBottom: "unset" } }}>
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
            Add fault
          </Button>
          <Button variant="outlined" onClick={handleRemove}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {/* is the key ok? */}
      <TableRow key={Math.random()}>
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
    </>
  );
};

export default VehicleListPageRow;
