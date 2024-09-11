import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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

const CreateEmployeeForm = ({
  handleSubmit,
  nameError,
  roleError,
  departmentError,
}: {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nameError: string | undefined;
  roleError: string | undefined;
  departmentError: string | undefined;
}) => {
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
      <Button type="submit" variant="contained">
        Create
      </Button>
    </Box>
  );
};

export default CreateEmployeeForm;
