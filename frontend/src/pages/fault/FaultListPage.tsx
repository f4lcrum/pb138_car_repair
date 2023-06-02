import { FC, useState } from "react";
import { Box, Paper, Switch, TableContainer, Typography } from "@mui/material";
import FaultTable from "../../components/tables/FaultTable";
import { Fault } from "../../types/types";
import FaultModal from "../../components/modals/FaultModal";
import { sampleFaults } from "../vehicle/VehicleListPage";

const sampleData: Fault[] = sampleFaults(new Date(), "Bob", 123, 450);

const FaultListPage: FC = () => {
  const [faultModalOpen, setFaultModalOpen] = useState(false);
  const [fault, setFault] = useState<Fault | undefined>(undefined);

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant={"h3"} color={"primary"}>
          Faults
        </Typography>
        <Switch /> Show only my tasks
        <TableContainer sx={{ marginTop: 4 }} component={Paper}>
          <FaultTable
            faults={sampleData}
            setFault={setFault}
            setModalOpen={setFaultModalOpen}
          />
        </TableContainer>
      </Box>
      <FaultModal
        open={faultModalOpen}
        setOpen={setFaultModalOpen}
        fault={fault}
      />
    </>
  );
};

export default FaultListPage;
