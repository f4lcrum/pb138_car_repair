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

  let repairs = showUnresolvedRepairs ? unresolvedRepairs : specificRepairs;

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant={"h3"} color={"primary"}>
          Repairs
        </Typography>
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={2}
          sx={{ marginTop: 2 }}
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
                    <TableCell>Owner</TableCell>
                    <TableCell>License plate</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Repair name</TableCell>
                    <TableCell>Creation date</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                {!repairs.isLoading && (
                  <TableBody>
                    {repairs.data &&
                      Array.from(repairs.data).map((repair) => (
                        <RepairListPageRow
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
