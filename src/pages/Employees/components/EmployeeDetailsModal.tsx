import { useAtom } from "jotai";
import {
  childModalOpenAtom,
  currentEmployeeAtom,
  modalOpenAtom,
} from "../../../atoms/employeeAtom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import EmployeeChildModal from "./EmployeeChildModal";
import { useEffect } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function EmployeeDetailsModal() {
  const [currentEmployee] = useAtom(currentEmployeeAtom);
  const [modalOpen, setModalOpen] = useAtom(modalOpenAtom);
  const [_, setChildModalOpen] = useAtom(childModalOpenAtom);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const escapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setModalOpen(false);
      }
    };

    addEventListener("keydown", escapeKey);

    return () => {
      removeEventListener("keydown", escapeKey);
    };
  }, []);

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Name:</strong> {currentEmployee?.name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Department:</strong> {currentEmployee?.department}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Role:</strong> {currentEmployee?.role}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "1rem",
            }}
          >
            <Button variant="contained" sx={{ width: "30%" }}>
              Edit
            </Button>
            <Button
              variant="contained"
              sx={{ width: "30%" }}
              color="error"
              onClick={() => setChildModalOpen(true)}
            >
              Delete
            </Button>
          </Box>
          <EmployeeChildModal />
        </Box>
      </Modal>
    </div>
  );
}
