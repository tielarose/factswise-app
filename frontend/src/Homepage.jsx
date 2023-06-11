import { Link } from "react-router-dom";
import "./Homepage.css";

// if you need a link that is an HTML element (text or button) wrap the element in a <Link> component from ReactRouter
// if you want to go to a URL outside of clicking an HTML element, then use
// const navigate = useNavigate()
// navigate('/welcome)
// or redirect("/login");
export default function Homepage() {
  return (
    <div className="Homepage">
      <h1>Welcome to MathFacts!</h1>
      <p>Designed by an eduator, for educators.</p>
      <p>
        Easily assess your students on their FactsWise goals, view detailed data
        about their progress, and more!
      </p>
      <div className="Homepage-login-buttons">
        <Link to="/educator/login">
          <button className="Homepage-login-button-educator">
            <h3>I'm an Educator</h3>
            <p>Sign in to your account or sign up for one</p>
          </button>
        </Link>
        <Link to="/student/login">
          <button className="Homepage-login-button-student">
            <h3>I'm a Student</h3>
            <p>Sign in to your account (created by your teacher)</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
