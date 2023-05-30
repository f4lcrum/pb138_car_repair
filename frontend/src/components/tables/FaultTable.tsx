import { FC } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { Fault } from "../../types/types";

interface FaultProps {
  faults: Fault[];
  setFault: (fault: Fault) => {};
  setModalOpen: (boolean) => {};
  fault?: Fault;
  size?: "small";
}

const FaultTable: FC<FaultProps> = ({
  faults,
  setFault,
  setModalOpen,
  size = undefined,
}) => {
  return (
    <Table size={size}>
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
        {faults.map((fault) => (
          <TableRow key={fault.id}>
            <TableCell>{fault.name}</TableCell>
            <TableCell>
              {fault.repairedAt
                ? format(fault.repairedAt, "MMMM do, yyyy H:mma")
                : ""}
            </TableCell>
            <TableCell>{fault.technician}</TableCell>
            <TableCell>{fault.workPrice}</TableCell>
            <TableCell>{fault.mileage}</TableCell>
            <TableCell align={"right"}>
              <Button
                variant={"outlined"}
                onClick={() => {
                  setFault(fault);
                  setModalOpen(true);
                }}
              >
                Detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FaultTable;
