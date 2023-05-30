import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import "@mui/material/Menu/Menu";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../types/types";

interface BarItem {
  label: string;
  route: string;
  roles: Set<UserRole>;
}

const BasePageBar = () => {
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
      label: "Repairs",
      route: "/repair",
      roles: new Set<UserRole>([UserRole.Admin, UserRole.Technician]),
    },
    {
      label: "Brands",
      route: "/brand",
      roles: new Set<UserRole>([UserRole.Admin, UserRole.Technician]),
    },
    {
      label: "Mechanics",
      route: "/mechanics",
      roles: new Set<UserRole>([UserRole.Admin]),
    },
    {
      label: "Profile",
      route: "/profile",
      roles: new Set<UserRole>([
        UserRole.Admin,
        UserRole.Technician,
        UserRole.Customer,
      ]),
    },
  ];

  const navigate = useNavigate();

  return (
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
              onClick={() => navigate("/login")}
              color="inherit"
              variant={"outlined"}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BasePageBar;
