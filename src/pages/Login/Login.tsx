import Typography from "@mui/material/Typography";
import { Alert, Card, Container } from "@mui/material";
import LoginForm from "./LoginForm";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, pending, credsIncorrect } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const user = await signIn({
      email: String(email),
      password: String(password),
    });
    if (user.success) navigate("/employees");
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
        <LoginForm handleSubmit={handleSubmit} pending={pending} />
        {credsIncorrect && !pending && (
          <Alert severity="error">Email or Password is incorrect.</Alert>
        )}
      </Card>
    </Container>
  );
};

export default Login;
