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
import { getBrands } from "../../components/modals/VehicleModal";
import BrandModal from "../../components/modals/BrandModal";
import ModelModal from "../../components/modals/ModelModal";

const BrandListPage: FC = () => {
  const brands = getBrands();
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant={"h3"} color={"primary"}>
          Brands
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
              onClick={() => setBrandModalOpen(true)}
              variant={"contained"}
            >
              Add Brand
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setModelModalOpen(true)}
              variant={"contained"}
            >
              Add Model
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Model Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brands.map((brand) => (
                    <>
                      <TableRow>
                        <TableCell colSpan={3} align={"left"}>
                          {brand.name}
                        </TableCell>
                      </TableRow>
                      {brand.models?.map((model) => (
                        <TableRow key={model.id ?? 0}>
                          <TableCell align={"right"} />
                          <TableCell>{model.name}</TableCell>
                          <TableCell>Car</TableCell>
                        </TableRow>
                      ))}
                    </>
                  ))}
                </TableBody>
                <TablePagination
                  count={brands.length}
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
      <BrandModal open={brandModalOpen} setOpen={setBrandModalOpen} />
      <ModelModal open={modelModalOpen} setOpen={setModelModalOpen} />
    </>
  );
};

export default BrandListPage;
