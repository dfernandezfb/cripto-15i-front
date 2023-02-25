import axios from "@/config/axios";
import { USER_VALUES } from "@/constants";
import useForm from "@/hooks/useForm";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Button from "../common/Button/Button";
// import Button from "@/common";

const AddUserForm = ({ cancel, getUsers }) => {
  const [countries, setCountries] = useState([]);
  const addUser = async () => {
    try {
      await axios.post("/users", values);
      cancel();
      getUsers();
      toast.success(`Usuario agregado con éxito. Bievenido ${values.name}`);
    } catch (error) {
      toast.error("Ups... Ocurrió un error");
    }
  };

  const getCountries = async () => {
    try {
      const { data } = await axios.get("/countries");
      setCountries(data.countries);
    } catch (error) {
      toast.error("Ups... Ocurrió un error");
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const { handleChange, handleSubmit, values } = useForm(USER_VALUES, addUser);

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={values.name}
                name="name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={handleChange}
                value={values.email}
                name="email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                onChange={handleChange}
                value={values.age}
                name="age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="admin"
                onChange={handleChange}
              >
                <option value={true}>Administrador</option>
                <option value={false}>Usuario común</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCountrySelect">
              <Form.Label>País</Form.Label>
              <Form.Select name="country" onChange={handleChange}>
                {countries.map((country) => (
                  <option value={country._id} key={country._id}>
                    {country.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <Button variant="success" type="submit" content="Agregar" />
      <Button
        variant="danger"
        type="button"
        content="Cancelar"
        onClick={cancel}
      />
    </Form>
  );
};

export default AddUserForm;
