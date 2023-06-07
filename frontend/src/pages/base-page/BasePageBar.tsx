import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "@mui/material/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { ReactNode, useState } from "react";
import UserModal from "../../components/modals/UserModal";
import { useAuth, useLogOut } from "../../hooks/useAuth";
import { Role } from "../../models/authTypes.ts";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import AbcIcon from "@mui/icons-material/Abc";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./basepagebar.module.css";

interface BarItem {
  label: string;
  icon: ReactNode;
  route: string;
  roles: Role[];
}

const barItems: BarItem[] = [
  {
    label: "Vehicles",
    icon: <DirectionsCarIcon />,
    route: "/vehicle",
    roles: [Role.CLIENT],
  },
  {
    label: "Repairs",
    icon: <CarRepairIcon />,
    route: "/repair",
    roles: [Role.TECHNICIAN],
  },
  {
    label: "Brands",
    icon: <AbcIcon />,
    route: "/brand",
    roles: [Role.ADMIN],
  },
  {
    label: "Technicians",
    icon: <ManageAccountsIcon />,
    route: "/technician",
    roles: [Role.ADMIN],
  },
];

const BasePageBar = () => {
  const navigate = useNavigate();
  const { logOut } = useLogOut();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { data } = useAuth();

  const onLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className={styles.menuText}
            >
              <strong>Car Service</strong>
            </Typography>
            <Stack
              className={styles.stack}
              direction={"row"}
              spacing={2}
              divider={
                <Divider
                  className={styles.divider}
                  orientation="vertical"
                  flexItem
                />
              }
            >
              {barItems
                .filter(
                  (barItems) =>
                    !!data?.item.role &&
                    barItems.roles.includes(data?.item.role)
                )
                .map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => navigate(item.route)}
                    color="inherit"
                  >
                    <Grid
                      container
                      direction="row"
                      gap={1}
                      justifyContent="center"
                    >
                      {item.icon}
                      <span className={styles.menuText}>{item.label}</span>
                    </Grid>
                  </Button>
                ))}
              <Button
                key={"profile"}
                onClick={() => setUserModalOpen(true)}
                color="inherit"
              >
                <Grid container direction="row" gap={1} justifyContent="center">
                  <PersonIcon />
                  <span className={styles.menuText}>Profile</span>
                </Grid>
              </Button>
              <Button onClick={onLogOut} color="inherit" variant={"outlined"}>
                <Grid container direction="row" gap={1} justifyContent="center">
                  <LogoutIcon />
                  <span className={styles.menuText}>Logout</span>
                </Grid>
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <UserModal open={userModalOpen} setOpen={setUserModalOpen} />
    </>
  );
};

export default BasePageBar;
