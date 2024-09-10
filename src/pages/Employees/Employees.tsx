import { Alert, Container } from "@mui/material";
import useEmployees from "../../hooks/useEmployees";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import EmployeesTable from "./components/EmployeesTable";

const Employees = () => {
  const { getEmployees } = useEmployees();

  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({ queryKey: ["employees"], queryFn: getEmployees });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{ height: "91vh", display: "flex", justifyContent: "center" }}
      >
        <Alert
          sx={{ width: "80%", height: "2rem", marginY: "10%" }}
          severity="error"
        >
          Error: {error?.message}
        </Alert>
      </Container>
    );
  }
  if (employees)
    return (
      <Container
        maxWidth="lg"
        sx={{
          height: "91vh",
          display: "flex",
          justifyContent: "center",
          paddingY: 5,
        }}
      >
        <EmployeesTable employees={employees} />
      </Container>
    );
};

export default Employees;
