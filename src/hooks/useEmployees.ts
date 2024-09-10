import {
  getAll,
  addOne,
  updateOne,
  deleteOne,
} from "../services/employeeService";
import { Employee } from "../types";

const useEmployees = () => {
  const getEmployees = async () => await getAll();

  const addEmployee = async (employeeData: Employee) => {
    if (
      Object.values(employeeData).some(
        (value) => !value || typeof value !== "string"
      )
    ) {
      throw new Error("All fields are required");
    }
    const response = await addOne(employeeData);
    return response;
  };

  const updateEmployee = async (employeeId: string, employeeData: Employee) => {
    if (
      Object.values(employeeData).some(
        (value) => !value || typeof value !== "string"
      )
    ) {
      throw new Error("Data cannot be empty");
    }
    const response = await updateOne(employeeId, employeeData);
    return response;
  };

  const deleteEmployee = async (employeeId: string) => {
    if (!employeeId) {
      throw new Error("Employee ID cannot be empty");
    }
    const response = await deleteOne(employeeId);
    return response;
  };

  return {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployees;
