import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "../../config/axios";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    const { data } = await axios.get("/users");
    setUsers(data.users);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>admin</th>
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
            <td>{user.admin ? "es admin" : "No es admin"}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersTable;
