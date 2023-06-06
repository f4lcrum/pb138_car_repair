import { FC } from "react";
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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useUnverifiedTechnicians,
  useVerifyTechnician,
} from "../../hooks/useUnverifiedTechnicians";

const TechnicianListPage: FC = () => {
  //todo do something with the error
  const { data, error, isLoading } = useUnverifiedTechnicians();
  const { verify } = useVerifyTechnician();

  const handleVerify = (id: string) => {
    verify(id);
  };

  //todo add technicians
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
                                onClick={() => handleVerify(user.id)}
                              >
                                Verify
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                  <TablePagination
                    count={0}
                    page={0}
                    onPageChange={() => {
                      return null;
                    }}
                    rowsPerPage={10}
                  />
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default TechnicianListPage;
