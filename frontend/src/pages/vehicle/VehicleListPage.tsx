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
import { Vehicle } from "../../types/types";
import VehicleModal from "../../components/modals/VehicleModal";

const sampleMaterial = () => {
  return [
    {
      id: 1,
      name: "Pneumatika Michelin 4x",
      price: "150",
    },
    {
      id: 2,
      name: "Hřebíky 100 ks",
      price: "10",
    },
    {
      id: 3,
      name: "Žlutý lak 1 litr",
      price: "25",
    },
  ];
};

export const sampleFaults = (
  manufacturedAt: Date,
  technician: string,
  mileage: number,
  price: number
) => [
  {
    id: 10,
    name: "Blatník",
    technician: technician,
    mileage: mileage,
    workPrice: price,
    repairedAt: manufacturedAt,
    description: "Pepo mám nějaké popraskané blatník, koukni na to",
    materials: sampleMaterial(),
  },
  {
    id: 11,
    name: "Převodovka",
    technician: technician,
    mileage: mileage + 3 * (mileage % 7),
    workPrice: 3 * price + 5 * (price % 13),
    repairedAt: manufacturedAt,
    materials: sampleMaterial(),
  },
  {
    id: 12,
    name: "Brzdy",
    technician: technician,
    mileage: mileage + 7 * (mileage % 6),
    workPrice: price + 16 * (price % 7),
    repairedAt: undefined,
    description: "mačkám na pedál a vono nic",
    materials: sampleMaterial(),
  },
];

const createData = (
  id: number,
  brand: string,
  model: string,
  licensePlate: string,
  manufacturedAt: Date,
  technician: string,
  mileage: number,
  price: number
) => {
  return {
    id,
    brand,
    model,
    licensePlate,
    manufacturedAt,
    faults: sampleFaults(manufacturedAt, technician, mileage, price),
  };
};

const sampleData: Vehicle[] = [
  createData(1, "BMW", "M3", "8888-8888", new Date(), "Gringo", 531, 500),
  createData(2, "Mercedes", "C", "MRC-DES1", new Date(), "Pavel", 9350, 600),
  createData(3, "Peugeot", "107", "1235-4653", new Date(), "Petr", 161080, 10),
  createData(4, "Škoda", "Fabia", "C1B-ULE", new Date(), "Bartoň", 423521, 50),
];

const VehicleListPage: FC = () => {
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant={"h3"} color={"primary"}>
          Vehicles
        </Typography>
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={2}
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
            <TableContainer
              sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              component={Paper}
            >
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
                  {sampleData.map((row) => (
                    <VehicleListPageRow key={row.id} vehicle={row} />
                  ))}
                </TableBody>
                <TablePagination
                  count={sampleData.length}
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
      <VehicleModal open={vehicleModalOpen} setOpen={setVehicleModalOpen} />
    </>
  );
};

export default VehicleListPage;
