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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import VehicleListPageRow from "./VehicleListPageRow";
import VehicleModal from "../../components/modals/VehicleModal";
import { useSearchParams } from "react-router-dom";
import { useVehicles } from "../../hooks/useVehicles";

const VehicleListPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);

  //todo do something with the error
  const { data, error, isLoading } = useVehicles(searchParams);

  return (
    <>
      {!isLoading && (
        <Box sx={{ m: 2 }}>
          <Typography variant={"h3"} color={"primary"}>
            Vehicles
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
                onClick={() => setVehicleModalOpen(true)}
                variant={"contained"}
              >
                Add Vehicle
              </Button>
            </Grid>
            <Grid item>
              <Button variant={"contained"}>Filter</Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Brand</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>License Plate</TableCell>
                      <TableCell>Manufactured At</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      Array.from(data).map((row) => (
                        <VehicleListPageRow key={row.id} vehicle={row} />
                      ))}
                  </TableBody>
                  <TablePagination
                    count={data?.length || 0}
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
      <VehicleModal open={vehicleModalOpen} setOpen={setVehicleModalOpen} />
    </>
  );
};

export default VehicleListPage;
