import { FC, useState } from "react";
import { RepairWithDetails } from "../../models/repairTypes.ts";
import { Button, TableCell, TableRow } from "@mui/material";
import { format } from "date-fns";
import { useAssignRepair } from "../../hooks/useRepairs.ts";
import RepairModal from "../../components/modals/RepairModal.tsx";

interface RepairListPageRowProps {
  repair: RepairWithDetails;
  showDetailButton: boolean;
}

const RepairListPageRow: FC<RepairListPageRowProps> = ({
  repair,
  showDetailButton,
}) => {
  const { assign } = useAssignRepair();
  const handleAssign = (repairId: string) => {
    assign(repairId);
  };

  const [repairModalOpen, setRepairModalOpen] = useState(false);

  return (
    <>
      <TableRow
        key={repair.id}
        sx={
          repair.resolvedAt && {
            backgroundColor: "#e5e5e5",
            "&:hover": {
              backgroundColor: "#e5e5e5",
            },
          }
        }
      >
        <TableCell>
          {repair.ownerFirstName + " " + repair.ownerLastName}
        </TableCell>
        <TableCell>{repair.licensePlate}</TableCell>
        <TableCell>{repair.brandModel}</TableCell>
        <TableCell>{repair.name}</TableCell>
        <TableCell>
          {format(new Date(repair.createdAt), "dd/MM/yyyy")}
        </TableCell>
        <TableCell align="right">
          {!repair.resolvedAt && (
            <Button
              sx={{ margin: 0.5 }}
              variant={"outlined"}
              onClick={() => handleAssign(repair.id)}
            >
              {!repair.technicianId ? "Assign" : "Unassign"}
            </Button>
          )}
          {showDetailButton && (
            <Button
              sx={{ margin: 0.5 }}
              variant="contained"
              onClick={() => setRepairModalOpen(true)}
            >
              Detail
            </Button>
          )}
        </TableCell>
      </TableRow>
      <RepairModal
        open={repairModalOpen}
        setOpen={setRepairModalOpen}
        repair={repair}
      />
    </>
  );
};

export default RepairListPageRow;
