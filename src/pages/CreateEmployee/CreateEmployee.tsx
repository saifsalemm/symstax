import { Alert, Box, Container } from "@mui/material";
import CreateEmployeeForm from "./components/CreateEmployeeForm";
import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import EmployeeDetailsHeader from "./components/EmployeeDetailsHeader";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addEmployee } = useEmployees();
  const [error, setError] = useState<string>();
  const [nameError, setNameError] = useState<string>();
  const [roleError, setRoleError] = useState<string>();
  const [departmentError, setDepartmentError] = useState<string>();

  const textValidation = (value: string) => {
    const textSchema = z
      .string()
      .min(5)
      .regex(/^[A-Z]/);

    return textSchema.safeParse(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString();
    const role = data.get("role")?.toString();
    const department = data.get("department")?.toString();

    if (!name || !textValidation(name).success) {
      return setNameError(
        "Name must start with uppercase and be at least 5 characters"
      );
    } else {
      setNameError(undefined);
    }
    if (!role || !textValidation(role).success) {
      return setRoleError(
        "Role must start with uppercase and be at least 5 characters"
      );
    } else {
      setRoleError(undefined);
    }
    if (!department) {
      return setDepartmentError("Department is Required");
    } else {
      setDepartmentError(undefined);
    }

    try {
      await addEmployee({ name, role, department });
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
      navigate("/employees?employeeCreated=1");
    } catch (error) {
      console.log(error);
      const e = error as Error;
      setError(e.message);
    }
  };

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
        <EmployeeDetailsHeader />
        <CreateEmployeeForm
          handleSubmit={handleSubmit}
          nameError={nameError}
          roleError={roleError}
          departmentError={departmentError}
        />
        {!!error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default CreateEmployee;
