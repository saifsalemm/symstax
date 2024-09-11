import { z } from "zod";
import { Employee } from "../types/types";

export const textValidation = (value: string) => {
  const textSchema = z
    .string()
    .min(5)
    .regex(/^[A-Z]/);

  return textSchema.safeParse(value);
};

export const employeeFormValidation = ({
  name,
  role,
  department,
  setFormError,
}: Omit<Employee, "id"> & {
  setFormError: (x: Employee) => void;
}) => {
  const errorInitialState = {
    name: "",
    role: "",
    department: "",
  };
  if (!name || !textValidation(name).success) {
    setFormError({
      ...errorInitialState,
      name: "Name must start with uppercase and be at least 5 characters",
    });
    return false;
  } else {
    setFormError({
      ...errorInitialState,
      name: "",
    });
  }
  if (!role || !textValidation(role).success) {
    setFormError({
      ...errorInitialState,
      role: "Role must start with uppercase and be at least 5 characters",
    });
    return false;
  } else {
    setFormError({
      ...errorInitialState,
      role: "",
    });
  }
  if (!department) {
    setFormError({
      ...errorInitialState,
      department: "Department is required",
    });
    return false;
  } else {
    setFormError({
      ...errorInitialState,
      department: "",
    });
  }

  return true;
};
