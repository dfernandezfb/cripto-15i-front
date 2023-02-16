import { useContext, useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const { login, authenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Dirección de correo</Form.Label>
        <Form.Control
          value={values.email}
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Ingresa tu  email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          value={values.password}
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Contraseña"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {false && (
        <Alert variant="danger" className="mt-3">
          {" "}
          El formato de los datos enviados no es correcto
        </Alert>
      )}
    </Form>
  );
};

export default LoginForm;
