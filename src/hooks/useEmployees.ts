import { useState } from "react";
import {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} from "../services/employeeService";
import { Employee } from "../types/types";

const useEmployees = () => {
  const [isPending, setIsPending] = useState(false);

  const getEmployees = async () => {
    setIsPending(true);
    const response = await getAll();
    setIsPending(false);
    return response;
  };

  const addEmployee = async (employeeData: {
    name: string;
    role: string;
    department: string;
  }) => {
    setIsPending(true);
    if (!employeeData.name || !employeeData.role || !employeeData.department) {
      throw new Error("All fields are required");
    }
    const response = await addOne(employeeData);
    setIsPending(false);
    return response;
  };

  const updateEmployee = async (employeeId: string, employeeData: Employee) => {
    setIsPending(true);
    if (
      Object.values(employeeData).some(
        (value) => !value || typeof value !== "string"
      )
    ) {
      throw new Error("Data cannot be empty");
    }
    const response = await updateOne(employeeId, employeeData);
    setIsPending(false);
    return response;
  };

  const deleteEmployee = async (employeeId: string) => {
    setIsPending(true);
    if (!employeeId) {
      throw new Error("Employee ID cannot be empty");
    }
    const response = await deleteOne(employeeId);
    setIsPending(false);
    return response;
  };

  return {
    isPending,
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
