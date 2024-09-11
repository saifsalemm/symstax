import { Box, Button, Modal, Typography } from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  childModalOpenAtom,
  currentEmployeeAtom,
  modalOpenAtom,
} from "../../../atoms/employeeAtom";
import useEmployees from "../../../hooks/useEmployees";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 1,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function EmployeeChildModal() {
  const queryClient = useQueryClient();
  const [childModalOpen, setChildModalOpen] = useAtom(childModalOpenAtom);
  const [_, setModalOpen] = useAtom(modalOpenAtom);
  const [currentEmployee, setCurrentEmployee] = useAtom(currentEmployeeAtom);
  const { deleteEmployee } = useEmployees();
  const [__, setParams] = useSearchParams();

  const handleClose = async () => {
    await deleteEmployee(currentEmployee?.id!);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
    setCurrentEmployee({ name: "", role: "", department: "" });
    setChildModalOpen(false);
    setModalOpen(false);
    setParams({ employee_deleted: "1" });
  };

  useEffect(() => {
    const escapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setChildModalOpen(false);
      }
    };

    addEventListener("keydown", escapeKey);

    return () => {
      removeEventListener("keydown", escapeKey);
    };
  }, []);

  return (
    <React.Fragment>
      <Modal
        open={childModalOpen}
        onClose={() => setChildModalOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 200,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h6" id="child-modal-title">
            <strong>Deleting Employee</strong>
          </Typography>
          <Typography id="child-modal-description">
            Are you sure to delete <strong>{currentEmployee?.name}</strong> ?
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            type="button"
          >
            Yes, Delete
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
