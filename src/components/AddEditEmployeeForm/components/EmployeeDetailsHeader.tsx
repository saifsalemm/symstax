import { Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentEmployeeAtom } from "../../../atoms/employeeAtom";

const EmployeeDetailsHeader = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const [_, setCurrentEmployee] = useAtom(currentEmployeeAtom);

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
        onClick={() => {
          setCurrentEmployee({ id: "", name: "", role: "", department: "" });
          navigate("/employees");
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "white", fontSize: "1rem" }} />
      </Button>
      <Typography variant="h5">{title}</Typography>
    </div>
  );
};

export default EmployeeDetailsHeader;
