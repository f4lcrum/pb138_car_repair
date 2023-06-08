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
  useTechnicianRepairs,
  useUnresolvedRepairs,
} from "../../hooks/useRepairs.ts";
import RepairListPageRow from "./RepairListPageRow.tsx";

const RepairListPage: FC = () => {
  const [showUnresolvedRepairs, setShowUnresolvedRepairs] = useState(false);

  const unresolvedRepairs = useUnresolvedRepairs();
  const specificRepairs = useTechnicianRepairs();

  const repairs = showUnresolvedRepairs ? unresolvedRepairs : specificRepairs;

  return (
    <>
      <Box>
        <Box margin={4}>
          <Typography variant={"h3"} color={"primary"} fontWeight="bold">
            Repairs
          </Typography>
        </Box>
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={2}
          padding="2vw"
        >
          <Grid item>
            <Button
              onClick={() => setShowUnresolvedRepairs(!showUnresolvedRepairs)}
              variant={"contained"}
            >
              {showUnresolvedRepairs
                ? " Show My Repairs"
                : "Show Unresolved Repairs"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Owner</b></TableCell>
                    <TableCell><b>License plate</b></TableCell>
                    <TableCell><b>Model</b></TableCell>
                    <TableCell><b>Repair name</b></TableCell>
                    <TableCell><b>Creation date</b></TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                {!repairs.isLoading && (
                  <TableBody>
                    {repairs.data &&
                      Array.from(repairs.data).map((repair) => (
                        <RepairListPageRow
                          key={"row_" + repair.id}
                          repair={repair}
                          showDetailButton={!showUnresolvedRepairs}
                        />
                      ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default RepairListPage;
