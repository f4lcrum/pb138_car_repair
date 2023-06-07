import { FC, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RepairModal from "../../components/modals/RepairModal";
import { SingleRepair } from "../../models/repairTypes";
import { useUnresolvedRepairs } from "../../hooks/useUnresolvedRepairs";
import { format } from "date-fns";

const RepairListPage: FC = () => {
  const [repairModalOpen, setRepairModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<
    SingleRepair | undefined
  >(undefined);

  //todo do something with the error
  const { data, error, isLoading } = useUnresolvedRepairs();

  const handleDetail = (repair: SingleRepair) => {
    setSelectedRepair(repair);
    setRepairModalOpen(true);
  };

  return (
    <>
      <Typography variant={"h3"} color={"primary"}>
        Repairs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>License Plate</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Repair name</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {data &&
                Array.from(data).map((repair) => (
                  <TableRow key={repair.id}>
                    <TableCell>{repair.licensePlate}</TableCell>
                    <TableCell>{repair.brandName}</TableCell>
                    <TableCell>{repair.brandModel}</TableCell>
                    <TableCell>{repair.name}</TableCell>
                    <TableCell>
                      {format(new Date(repair.createdAt), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => handleDetail(repair)}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <RepairModal
        open={repairModalOpen}
        setOpen={setRepairModalOpen}
        repair={selectedRepair}
      />
    </>
  );
};

export default RepairListPage;
