import { Dispatch, FC, SetStateAction } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { RepairWithTechnician } from "../../models/repairTypes";
import { useRepairs } from "../../hooks/useRepairs";

interface FaultProps {
  vehicleId?: string;
  setRepair: Dispatch<SetStateAction<RepairWithTechnician | undefined>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  size?: "small";
}

const FaultTable: FC<FaultProps> = ({
  vehicleId,
  setRepair,
  setModalOpen,
  size = undefined,
}) => {
  //todo do something with the error
  const { data, error, isLoading } = useRepairs(vehicleId ?? "");

  return (
    <>
      {!isLoading && (
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
            {data &&
              Array.from(data).map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>{repair.name}</TableCell>
                  <TableCell>
                    {repair.resolvedAt
                      ? format(
                          new Date(repair.resolvedAt),
                          "MMMM do, yyyy H:mma"
                        )
                      : ""}
                  </TableCell>
                  <TableCell>{repair.technicianName}</TableCell>
                  <TableCell>{repair.workPrice}</TableCell>
                  <TableCell>{repair.mileage}</TableCell>
                  <TableCell align={"right"}>
                    <Button
                      variant={"outlined"}
                      onClick={() => {
                        setRepair(repair);
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
      )}
    </>
  );
};

export default FaultTable;
