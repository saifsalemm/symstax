import { useState } from "react";
import useEmployees from "../../hooks/useEmployees";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Employee } from "../../types/types";
import { employeeFormValidation } from "../../utils/validationUtils";
import AddEditEmployeeForm from "../../components/AddEditEmployeeForm/AddEditEmployeeForm";
import { useAtom } from "jotai";
import { currentEmployeeAtom } from "../../atoms/employeeAtom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [_, setCurrentEmployee] = useAtom(currentEmployeeAtom);
  const { employeeId } = useParams();
  const queryClient = useQueryClient();
  const { updateEmployee } = useEmployees();
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [formError, setFormError] = useState<Employee>({
    name: "",
    role: "",
    department: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString() ?? "";
    const role = data.get("role")?.toString() ?? "";
    const department = data.get("department")?.toString() ?? "";

    const isValid = employeeFormValidation({
      name: name,
      role: role,
      department: department,
      setFormError,
    });

    if (!isValid) return;

    try {
      setIsPending(true);
      await updateEmployee(employeeId!, { name, role, department });
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
      setCurrentEmployee({ name: "", role: "", department: "" });
      setIsPending(false);
      navigate("/employees?employee_edited=1");
    } catch (error) {
      console.log(error);
      const e = error as Error;
      setIsPending(false);
      setError(e.message);
    }
  };

  return (
    <AddEditEmployeeForm
      mode="Edit"
      formError={formError}
      error={error}
      handleSubmit={handleSubmit}
      isPending={isPending}
    />
  );
};

export default EditEmployee;
