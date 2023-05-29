import { FC } from "react";
import {
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
import CarListPageRow from "./CarListPageRow";

const sampleData = [
  createData(1, "BMW", "M3", "8888-8888", new Date(), "Gringo", 531, 500),
  createData(2, "Mercedes", "C", "MRC-DES1", new Date(), "Pavel", 9350, 600),
  createData(3, "Peugeot", "107", "1235-4653", new Date(), "Petr", 161080, 10),
  createData(4, "Škoda", "Fabia", "C1B-ULE", new Date(), "Bartoň", 423521, 50),
];

function createData(
  id: number,
  brand: string,
  model: string,
  licensePlate: string,
  manufacturedAt: Date,
  mechanic: string,
  mileage: number,
  price: number
) {
  return {
    id,
    brand,
    model,
    licensePlate,
    manufacturedAt,
    repairs: [
      {
        mechanic: mechanic,
        mileage: mileage,
        price: price,
        repairedAt: manufacturedAt,
      },
      {
        mechanic: mechanic,
        mileage: mileage + 3 * (mileage % 7),
        price: price + 5 * (price % 13),
        repairedAt: manufacturedAt,
      },
      {
        mechanic: mechanic,
        mileage: mileage + 7 * (mileage % 6),
        price: price + 16 * (price % 7),
        repairedAt: manufacturedAt,
      },
    ],
  };
}

const CarListPage: FC = () => {
  return (
    <>
      <Typography variant={"h3"} color={"primary"}>
        Cars
      </Typography>
      <Grid
        container
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={2}
      >
        <Grid item>
          <Button variant={"contained"}>Add Car</Button>
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
                {sampleData.map((row) => (
                  <>
                    <CarListPageRow key={row.id} row={row} />
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default CarListPage;
