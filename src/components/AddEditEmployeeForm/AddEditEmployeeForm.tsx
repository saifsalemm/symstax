import { Alert, Box, Container } from "@mui/material";
import EmployeeDetailsHeader from "./components/EmployeeDetailsHeader";
import { Employee } from "../../types/types";
import EmployeeForm from "./components/EmployeeForm";

const AddEditEmployeeForm = ({
  mode,
  formError,
  error,
  handleSubmit,
  isPending,
}: {
  mode: string;
  formError: Omit<Employee, "id">;
  error: string | undefined;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
}) => {
  return (
    <Container maxWidth="sm" sx={{ height: "91vh", paddingY: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          bgcolor: "white",
          boxShadow: 4,
          padding: "2rem",
        }}
      >
        <EmployeeDetailsHeader
          title={mode === "Add" ? "Add New Employee" : "Edit Employee"}
        />
        <EmployeeForm
          handleSubmit={handleSubmit}
          nameError={formError.name}
          roleError={formError.role}
          departmentError={formError.department}
          mode={mode}
          isPending={isPending}
        />
        {!!error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default AddEditEmployeeForm;
