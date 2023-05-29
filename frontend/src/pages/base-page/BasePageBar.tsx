import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import "@mui/material/Menu/Menu";
import { useNavigate } from "react-router-dom";

enum TodoUserRole {
  Admin = "admin",
  Mechanic = "mechanic",
  Customer = "customer",
}

interface BarItem {
  label: string;
  route: string;
  roles: Set<TodoUserRole>;
}

const BasePageBar = () => {
  const barItems: BarItem[] = [
    {
      label: "Cars",
      route: "/car",
      roles: new Set<TodoUserRole>([
        TodoUserRole.Admin,
        TodoUserRole.Mechanic,
        TodoUserRole.Customer,
      ]),
    },
    {
      label: "Repairs",
      route: "/repair",
      roles: new Set<TodoUserRole>([TodoUserRole.Admin, TodoUserRole.Mechanic]),
    },
    {
      label: "Brands",
      route: "/brand",
      roles: new Set<TodoUserRole>([TodoUserRole.Admin, TodoUserRole.Mechanic]),
    },
    {
      label: "Profile",
      route: "/profile",
      roles: new Set<TodoUserRole>([
        TodoUserRole.Admin,
        TodoUserRole.Mechanic,
        TodoUserRole.Customer,
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
