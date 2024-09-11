import { Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TableToolbar() {
  const navigate = useNavigate();

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
      ]}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <strong>Employees Data</strong>
      </Typography>
      <Button
        sx={{ flex: "1 1 20%" }}
        variant="contained"
        color="success"
        onClick={() => navigate("/employees/create")}
      >
        Add Employee
      </Button>
    </Toolbar>
  );
}
