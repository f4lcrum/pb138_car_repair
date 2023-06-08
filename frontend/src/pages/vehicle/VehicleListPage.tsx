import { FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import VehicleListPageRow from "./VehicleListPageRow";
import VehicleModal from "../../components/modals/VehicleModal";
import { useSearchParams } from "react-router-dom";
import { useVehicles } from "../../hooks/useVehicles";
import { useQueryClient } from "react-query";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useBrands } from "../../hooks/useBrands.ts";

const VehicleListPage: FC = () => {
  const [searchParams, _] = useSearchParams();
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const queryClient = useQueryClient();
  const [searchedBrand, setSearchedBrand] = useState<string>("NOT_SELECTED");
  const [searchedLicensePlate, setSearchedLicensePlate] = useState<string>("");
  const { data, isLoading } = useVehicles(searchParams);
  const brands = useBrands();

  const handleSort = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    searchParams.set("manufacturedAt", "true");
    searchParams.set("sortOrder", newOrder);
    queryClient.invalidateQueries(["vehicles"]);
    setOrder(newOrder);
  };

  const handleBrandSearch = (event: SelectChangeEvent) => {
    const newBrand = event.target.value;

    if (newBrand === "NOT_SELECTED") {
      searchParams.delete("brandName");
    } else {
      searchParams.set("brandName", newBrand);
    }

    queryClient.invalidateQueries(["vehicles"]);
    setSearchedBrand(newBrand);
  };

  return (
    <>
      {!isLoading && (
        <Box>
          <Box margin={4}>
            <Typography variant={"h3"} color={"primary"} fontWeight="bold">
              Vehicles
            </Typography>
          </Box>

          <Grid container alignItems={"center"} spacing={2} padding="2vw">
            <Grid item>
              <TextField
                label="License Plate"
                fullWidth={true}
                value={searchedLicensePlate}
                onChange={(event) => {
                  setSearchedLicensePlate(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={searchedBrand}
                  label="brand"
                  onChange={handleBrandSearch}
                >
                  <MenuItem key={"NOT_SELECTED"} value={"NOT_SELECTED"}>
                    All brands
                  </MenuItem>
                  {brands.data &&
                    Array.from(brands.data).map((brand) => (
                      <MenuItem key={brand.id} value={brand.brand}>
                        {brand.brand}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item flexGrow={1} />
            <Grid item>
              <Button
                onClick={() => setVehicleModalOpen(true)}
                variant={"contained"}
              >
                Add Vehicle
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>
                        <b>Brand</b>
                      </TableCell>
                      <TableCell>
                        <b>Model</b>
                      </TableCell>
                      <TableCell>
                        <b>License Plate</b>
                      </TableCell>
                      <TableCell sortDirection={order}>
                        <TableSortLabel
                          active
                          direction={order}
                          onClick={() => handleSort()}
                        >
                          <b>Manufactured At</b>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      Array.from(data)
                        .filter((vehicle) =>
                          vehicle.licensePlate
                            .toLowerCase()
                            .includes(searchedLicensePlate.toLowerCase())
                        )
                        .map((row) => (
                          <VehicleListPageRow key={row.id} vehicle={row} />
                        ))}
                  </TableBody>
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
