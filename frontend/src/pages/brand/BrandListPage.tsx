import React, { FC, useState } from "react";
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
import BrandModal from "../../components/modals/BrandModal";
import ModelModal from "../../components/modals/ModelModal";
import { useBrands } from "../../hooks/useBrands";

const BrandListPage: FC = () => {
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  const { data, isLoading } = useBrands();

  return (
    <>
      {!isLoading && (
        <Box>
          <Box margin={4}>
            <Typography variant={"h3"} color={"primary"} fontWeight="bold">
              Brands
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
                      <TableCell><b>Brand</b></TableCell>
                      <TableCell><b>Model</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      Array.from(data).map((brand) => (
                        <React.Fragment key={"fragment_" + brand.id}>
                          <TableRow key={brand.id}>
                            <TableCell colSpan={3} align={"left"}>
                              {brand.brand}
                            </TableCell>
                          </TableRow>
                          {brand.models?.map((model) => (
                            <TableRow key={model.id}>
                              <TableCell align={"right"} />
                              <TableCell>{model.name}</TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      )}

      <BrandModal open={brandModalOpen} setOpen={setBrandModalOpen} />
      <ModelModal open={modelModalOpen} setOpen={setModelModalOpen} />
    </>
  );
};

export default BrandListPage;
