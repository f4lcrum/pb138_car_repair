import { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Fault, Vehicle } from "../../types/types";
import FaultModal from "../../components/modals/FaultModal";

const VehicleListPageRow = (props: { vehicle: Vehicle }) => {
  const { vehicle } = props;
  const [open, setOpen] = useState(false);
  const [faultModalOpen, setFaultModalOpen] = useState(false);
  const [fault, setFault] = useState<Fault | undefined>(undefined);

  return (
    <>
      <TableRow
        onClick={() => setOpen(!open)}
        key={Math.random()}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{vehicle.brand}</TableCell>
        <TableCell>{vehicle.model}</TableCell>
        <TableCell>{vehicle.licensePlate}</TableCell>
        <TableCell>{format(vehicle.manufacturedAt, "yyyy")}</TableCell>
        <TableCell align={"right"}>
          <Button variant={"contained"}>Add fault</Button>
        </TableCell>
      </TableRow>
      <TableRow key={Math.random()}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Faults
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Repair Date</TableCell>
                    <TableCell>Technician</TableCell>
                    <TableCell>Total Price (€)</TableCell>
                    <TableCell>Mileage (km)</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicle.faults.map((fault) => (
                    <TableRow key={fault.price}>
                      <TableCell>{fault.name}</TableCell>
                      <TableCell>
                        {fault.repairedAt
                          ? format(fault.repairedAt, "MMMM do, yyyy H:mma")
                          : ""}
                      </TableCell>
                      <TableCell>{fault.mechanic}</TableCell>
                      <TableCell>{fault.workPrice}</TableCell>
                      <TableCell>{fault.mileage}</TableCell>
                      <TableCell align={"right"}>
                        <Button
                          variant={"outlined"}
                          onClick={() => {
                            setFault(fault);
                            setFaultModalOpen(true);
                          }}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
