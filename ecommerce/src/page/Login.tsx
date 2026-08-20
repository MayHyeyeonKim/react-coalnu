import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, type FormEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setAuthenticate: (authenticated: boolean) => void;
}

const Login = ({ setAuthenticate }: LoginProps) => {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const loginUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rememberMe) {
      localStorage.setItem("authenticated", "true");
      sessionStorage.removeItem("authenticated");
    } else {
      sessionStorage.setItem("authenticated", "true");
      localStorage.removeItem("authenticated");
    }

    setAuthenticate(true);
    navigate("/");
  };

  return (
    <main className="login-page">
      <Container>
        <Form className="login-form" onSubmit={loginUser}>
          <div className="login-heading">
            <p>Welcome back</p>
            <h1>Login</h1>
            <span>Sign in to continue your coffee journey.</span>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
          </Form.Group>

          <Button className="login-submit" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </main>
  );
};

export default Login;
