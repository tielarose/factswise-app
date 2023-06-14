import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "././components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// entry point of your application
// used by index.html
// you shouldn't be modifying this much

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
