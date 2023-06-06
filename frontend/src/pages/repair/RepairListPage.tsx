import { FC, useState } from "react";
import { Box, Paper, Switch, TableContainer, Typography } from "@mui/material";
import FaultTable from "../../components/tables/FaultTable";
import RepairModal from "../../components/modals/RepairModal";
import { SingleRepair } from "../../models/repairTypes";
import { useUnresolvedRepairs } from "../../hooks/useUnresolvedRepairs";

//todo try to change this component because of the react query hook
const RepairListPage: FC = () => {
  const [repairModalOpen, setRepairModalOpen] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState<
    SingleRepair | undefined
  >(undefined);

  //todo do something with the error
  const { data, error, isLoading } = useUnresolvedRepairs();

  return (
    <>
      {!isLoading && (
        <Box sx={{ m: 2 }}>
          <Typography variant={"h3"} color={"primary"}>
            Faults
          </Typography>
          <Switch /> Show only my tasks
          <TableContainer sx={{ marginTop: 4 }} component={Paper}>
            <FaultTable
              setRepair={setSelectedRepair}
              setModalOpen={setRepairModalOpen}
            />
          </TableContainer>
        </Box>
      )}

      <RepairModal
        open={repairModalOpen}
        setOpen={setRepairModalOpen}
        repair={selectedRepair}
      />
    </>
  );
};

export default RepairListPage;
