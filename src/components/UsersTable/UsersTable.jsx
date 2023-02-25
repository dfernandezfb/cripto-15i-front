import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";

import axios from "@/config/axios";
import { toast } from "react-toastify";
import Button from "@/components/common/Button/Button";
import AddUserForm from "../AddUserForm/AddUserForm";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingUser, setAddingUser] = useState(false);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      toast.error("Ups... Algo falló, intenta de nuevo más tarde");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete("/users", { data: { id } });
      toast.info("Usuario eliminado");
    } catch (error) {
      toast.error("Ups... Algo falló, intenta de nuevo más tarde");
    }
  };

  const handleAddForm = () => {
    setAddingUser(true);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            content="Agregar usuario"
            onClick={handleAddForm}
            className="me-3 mb-3"
          />
        </Col>
      </Row>
      {addingUser && (
        <Container>
          <Row>
            <Col>
              <AddUserForm
                cancel={() => setAddingUser(false)}
                getUsers={getUsers}
              />
            </Col>
          </Row>
        </Container>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>pais</th>
            <th>admin</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user._id}</td>
              <td>
                {user.name} {user.lastname}
              </td>
              <td>{user.email}</td>
              <td>{user.country?.name}</td>
              <td>{user.admin ? "es admin" : "No es admin"}</td>
              <td>
                <Button
                  content="Borrar"
                  tooltip="¡Cuidado! Esta acción elimina permanentemente al usuario de los datos"
                  variant="danger"
                  onClick={() => deleteUser(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UsersTable;
