import { useState } from "react";
import { format } from "date-fns";
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
import { Fault, Vehicle } from "../../types/types";
import FaultModal from "../../components/modals/FaultModal";
import FaultTable from "../../components/tables/FaultTable";

const VehicleListPageRow = (props: { vehicle: Vehicle }) => {
  const { vehicle } = props;
  const [open, setOpen] = useState(false);
  const [faultModalOpen, setFaultModalOpen] = useState(false);
  const [fault, setFault] = useState<Fault | undefined>(undefined);

  return (
    <>
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
        <TableCell>{vehicle.brand}</TableCell>
        <TableCell>{vehicle.model}</TableCell>
        <TableCell>{vehicle.licensePlate}</TableCell>
        <TableCell>{format(vehicle.manufacturedAt, "yyyy")}</TableCell>
        <TableCell align={"right"}>
          <Button
            variant={"contained"}
            onClick={() => {
              setFault(undefined);
              setFaultModalOpen(true);
            }}
          >
            Add fault
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={Math.random()}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Faults
              </Typography>
              <FaultTable
                faults={vehicle.faults}
                setFault={setFault}
                setModalOpen={setFaultModalOpen}
                size={"small"}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <FaultModal
        open={faultModalOpen}
        setOpen={setFaultModalOpen}
        fault={fault}
      />
    </>
  );
};

export default VehicleListPageRow;
