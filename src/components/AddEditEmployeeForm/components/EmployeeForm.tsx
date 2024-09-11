import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { currentEmployeeAtom } from "../../../atoms/employeeAtom";
import { useAtom } from "jotai";

const deparments = [
  "IT",
  "Management",
  "Design",
  "QA",
  "Human Resources",
  "Marketing",
  "Customer Support",
  "Data",
  "Finance",
  "Operations",
  "Sales",
];

const EmployeeForm = ({
  handleSubmit,
  nameError,
  roleError,
  departmentError,
  mode,
  isPending,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nameError: string | undefined;
  roleError: string | undefined;
  departmentError: string | undefined;
  mode: string;
  isPending: boolean;
}) => {
  const [data, setData] = useAtom(currentEmployeeAtom);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <FormControl>
        <TextField
          name="name"
          type="text"
          label="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          variant="outlined"
          error={!!nameError}
          helperText={nameError}
          required
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          name="role"
          type="text"
          label="Role"
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          variant="outlined"
          error={!!roleError}
          helperText={roleError}
          required
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose Department</InputLabel>
        <Select
          name="department"
          value={data.department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose Department"
          error={!!departmentError}
          required
        >
          {deparments.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" disabled={isPending}>
        {mode === "Add" ? "Create" : "Save"}
      </Button>
    </Box>
  );
};

export default EmployeeForm;
