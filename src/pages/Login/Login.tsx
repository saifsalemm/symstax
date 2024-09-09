import Typography from "@mui/material/Typography";
import { Card, Container } from "@mui/material";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    validateInputs({ email: String(email), password: String(password) });
    console.log("FORM SUBMIT", { email, password });
  };

  const validateInputs = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    let isValid = true;

    if (!email || !password) return;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: "91vh", display: "flex", justifyContent: "center" }}
    >
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          width: "100%",
          padding: 4,
          gap: 2,
          margin: "auto",
          ["sm"]: {
            maxWidth: "450px",
          },
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
        }}
      >
        <h3>Symstax</h3>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <LoginForm
          handleSubmit={handleSubmit}
          emailError={emailError}
          passwordError={passwordError}
          emailErrorMessage={emailErrorMessage}
          passwordErrorMessage={passwordErrorMessage}
        />
      </Card>
    </Container>
  );
};

export default Login;
