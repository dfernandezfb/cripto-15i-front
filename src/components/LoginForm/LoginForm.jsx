import { useContext, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOGIN_VALUES } from "../../constants";
import { UserContext } from "../../context/UserContext";
import { validationLogin } from "../../helpers/validations";
import useForm from "../../hooks/useForm";
import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../common/Button/Button";

const LoginForm = () => {
  const { login, authenticated } = useContext(UserContext);
  const { width } = useMediaQuery();
  const { handleChange, handleSubmit, values, errors } = useForm(
    LOGIN_VALUES,
    login,
    validationLogin
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/home");
    }
  }, [authenticated]);

  return (
    <>
      {width > 576 ? (
        <div className="d-flex">
          <h1>Estoy en una computadora</h1>
          <p>hola hola hola</p>
          <Button
            content="Soy un botón"
            tooltip="Este es un mensaje de ayuda"
          />
        </div>
      ) : (
        <>
          <h1>Estoy en un telefono</h1>
          <p>hola hola hola</p>
        </>
      )}
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
        <Button variant="primary" type="submit" content="Enviar datos" />
        {Object.keys(errors).length !== 0 &&
          Object.values(errors).map((error, index) => (
            <Alert variant="danger" className="mt-3" key={index}>
              {error}
            </Alert>
          ))}
      </Form>
    </>
  );
};

export default LoginForm;

// {test:true,test2:false}
// Object.keys(object) ===> [test,test2]
// Object.values(object) ===> [true, false]
