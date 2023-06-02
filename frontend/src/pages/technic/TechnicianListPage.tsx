import { FC } from "react";
import {
  Box,
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

const TechnicianListPage: FC = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant={"h3"} color={"primary"}>
        Technics
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
              <TableBody></TableBody>
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
  );
};

export default TechnicianListPage;
