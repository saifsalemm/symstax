import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

interface LoginFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  emailError: boolean;
  passwordError: boolean;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

const LoginForm = ({
  handleSubmit,
  emailError,
  passwordError,
  emailErrorMessage,
  passwordErrorMessage,
}: LoginFormProps) => {
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
        <FormLabel htmlFor="email">Email</FormLabel>
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={emailError ? "error" : "primary"}
          sx={{ ariaLabel: "email" }}
        />
      </FormControl>
      <FormControl>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormLabel htmlFor="password">Password</FormLabel>
        </Box>
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          color={passwordError ? "error" : "primary"}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained">
        Sign in
      </Button>
    </Box>
  );
};

export default LoginForm;
