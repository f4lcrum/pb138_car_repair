import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import "@mui/material/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../types/types";
import { useState } from "react";
import UserModal from "../../components/modals/UserModal";
import { authApi } from "../../services";

interface BarItem {
  label: string;
  route: string;
  roles: Set<UserRole>;
}

const barItems: BarItem[] = [
  {
    label: "Vehicles",
    route: "/vehicle",
    roles: new Set<UserRole>([
      UserRole.Admin,
      UserRole.Technician,
      UserRole.Customer,
    ]),
  },
  {
    label: "Faults",
    route: "/fault",
    roles: new Set<UserRole>([UserRole.Admin, UserRole.Technician]),
  },
  {
    label: "Brands",
    route: "/brand",
    roles: new Set<UserRole>([UserRole.Admin, UserRole.Technician]),
  },
  {
    label: "Technicians",
    route: "/technicians",
    roles: new Set<UserRole>([UserRole.Admin]),
  },
];

const BasePageBar = () => {
  const navigate = useNavigate();
  const [userModalOpen, setUserModalOpen] = useState(false);

  const onLogOut = () => {
    authApi
      .logOut()
      .then(() => {
        navigate("/login");
      })
      .catch();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Car Service
            </Typography>
            <Stack direction={"row"} spacing={2}>
              {barItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                key={"profile"}
                onClick={() => setUserModalOpen(true)}
                color="inherit"
              >
                Profile
              </Button>
              <Button onClick={onLogOut} color="inherit" variant={"outlined"}>
                Logout
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
