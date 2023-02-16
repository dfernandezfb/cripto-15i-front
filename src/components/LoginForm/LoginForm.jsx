import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../../config/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [backErrors, setBackErrors] = useState(false);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/users/login", values);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      toast.error("Ups! Hubo un error, intenta más tarde por favor");
      setBackErrors(true);
    }
  };
  useEffect(() => {
    if (backErrors) {
      setTimeout(() => {
        setBackErrors(false);
      }, 3000);
    }
  }, [backErrors]);

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
      {backErrors && (
        <Alert variant="danger" className="mt-3">
          {" "}
          El formato de los datos enviados no es correcto
        </Alert>
      )}
    </Form>
  );
};

export default LoginForm;
