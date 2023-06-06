import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import "@mui/material/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserModal from "../../components/modals/UserModal";
import { useAuth, useLogOut } from "../../hooks/useAuth";
import { Role } from "../../models/authTypes.ts";

interface BarItem {
  label: string;
  route: string;
  roles: Role[];
}

const barItems: BarItem[] = [
  {
    label: "Vehicles",
    route: "/vehicle",
    roles: [Role.CLIENT, Role.TECHNICIAN],
  },
  {
    label: "Faults",
    route: "/fault",
    roles: [Role.TECHNICIAN],
  },
  {
    label: "Brands",
    route: "/brand",
    roles: [Role.ADMIN],
  },
  {
    label: "Technicians",
    route: "/technicians",
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Car Service
            </Typography>
            <Stack direction={"row"} spacing={2}>
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
