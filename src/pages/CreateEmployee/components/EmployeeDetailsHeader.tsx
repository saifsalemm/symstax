import { Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";

const EmployeeDetailsHeader = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "6%",
        display: "flex",
        justifyContent: "left",
        gap: "1rem",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ height: "2rem", width: "0.5rem" }}
        onClick={() => navigate("/employees")}
      >
        <ArrowBackIosNewIcon sx={{ color: "white", fontSize: "1rem" }} />
      </Button>
      <Typography variant="h5">Add New Employee</Typography>
    </div>
  );
};

export default EmployeeDetailsHeader;
