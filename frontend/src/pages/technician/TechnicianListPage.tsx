import { FC, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useUnverifiedTechnicians,
  useVerifyTechnician,
} from "../../hooks/useUnverifiedTechnicians";
import ConfirmModal from "../../components/modals/ConfirmModal.tsx";
import { Technician } from "../../models/userTypes.ts";

const TechnicianListPage: FC = () => {
  //todo do something with the error
  const { data, error, isLoading } = useUnverifiedTechnicians();
  const { verify } = useVerifyTechnician();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [technicianToVerify, setTechnicianToVerify] = useState<
    Technician | undefined
  >(undefined);

  const handleVerify = (id: string) => {
    verify(id);
    setTechnicianToVerify(undefined);
  };

  return (
    <>
      {!isLoading && (
        <Box sx={{ m: 2 }}>
          <Typography variant={"h3"} color={"primary"}>
            Technicians
          </Typography>
          <Grid
            container
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={2}
            sx={{ marginTop: 2 }}
          >
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Verified</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      Array.from(data).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>
                            {user.isVerified ? "true" : "false"}
                          </TableCell>
                          <TableCell align="right">
                            {!user.isVerified && (
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  setTechnicianToVerify(user);
                                  setConfirmModalOpen(true);
                                }}
                              >
                                Verify
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      )}
      <ConfirmModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        text={
          "Are you sure you want to verify the technician " +
          technicianToVerify?.firstName +
          " " +
          technicianToVerify?.lastName +
          "?"
        }
        confirmAction={() => handleVerify(technicianToVerify?.id ?? "-1")}
      />
    </>
  );
};

export default TechnicianListPage;
