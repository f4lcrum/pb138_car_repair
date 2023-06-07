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
import BrandModal from "../../components/modals/BrandModal";
import ModelModal from "../../components/modals/ModelModal";
import { useBrands } from "../../hooks/useBrands";

const BrandListPage: FC = () => {
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [modelModalOpen, setModelModalOpen] = useState(false);

  //todo do something with the error
  const { data, error, isLoading } = useBrands();

  return (
    <>
      {!isLoading && (
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data &&
                      Array.from(data).map((brand) => (
                        <>
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
                        </>
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
