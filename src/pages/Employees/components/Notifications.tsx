import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const EmployeeNotifications = () => {
  const [employeeCreated, setEmployeeCreated] = useState(
    useSearchParams()[0].get("employee_added") === "1"
  );
  const [employeeDeleted, setEmployeeDeleted] = useState(
    useSearchParams()[0].get("employee_deleted") === "1"
  );
  const [employeeEdited, setEmployeeEdited] = useState(
    useSearchParams()[0].get("employee_edited") === "1"
  );

  return (
    <>
      <Snackbar
        open={employeeCreated}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert
          onClose={() => setEmployeeCreated(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={employeeDeleted}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert
          onClose={() => setEmployeeDeleted(false)}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee Deleted Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={employeeEdited}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <Alert
          onClose={() => setEmployeeEdited(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Employee Edited Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmployeeNotifications;
