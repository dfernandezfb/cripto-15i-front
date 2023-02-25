import { Container } from "react-bootstrap";
import UsersTable from "../components/UsersTable/UsersTable";

const Home = () => {
  return (
    <Container className="mt-5">
      <UsersTable />
    </Container>
  );
};

export default Home;
