import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

// if you need a link that is an HTML element (text or button) wrap the element in a <Link> component from ReactRouter
// if you want to go to a URL outside of clicking an HTML element, then use
// const navigate = useNavigate()
// navigate('/welcome)
// or redirect("/login");
function WelcomeScreen() {
  return (
    <Container>
      <h1>Some Big Welcome Text Here</h1>
      <p>Probably a sentence explaining more here</p>

      <Row>
        <Col md={3}>
          <Link to="/educator/login">
            <Button size="lg">Educator Log In</Button>
          </Link>
        </Col>
        <Col md={3}>
          <Link to="/student/login">
            <Button size="lg">Student Log In</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default WelcomeScreen;
