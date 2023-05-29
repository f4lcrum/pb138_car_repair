import { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CarListPageRow = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={Math.random()} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.brand}</TableCell>
        <TableCell>{row.model}</TableCell>
        <TableCell>{row.licensePlate}</TableCell>
        <TableCell>{format(row.manufacturedAt, "yyyy")}</TableCell>
        <TableCell align={"right"}>
          <Button variant={"contained"}>Add fault</Button>
        </TableCell>
      </TableRow>
      <TableRow key={Math.random()}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Repairs
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Repair Date</TableCell>
                    <TableCell>Mechanic</TableCell>
                    <TableCell>Price (€)</TableCell>
                    <TableCell>Mileage</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.repairs.map((repair) => (
                    <TableRow key={repair.price}>
                      <TableCell>
                        {format(repair.repairedAt, "MMMM do, yyyy H:mma")}
                      </TableCell>
                      <TableCell>{repair.mechanic}</TableCell>
                      <TableCell>{repair.price}</TableCell>
                      <TableCell>{repair.mileage}</TableCell>
                      <TableCell align={"right"}>
                        <Button variant={"outlined"}>Detail</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CarListPageRow;
