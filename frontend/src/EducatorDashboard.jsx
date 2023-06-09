import { AppContext } from "./App";

export default function EducatorDashboard() {
  const currentUser = AppContext.currentUser;

  console.log(
    "EducatorDashboard component, line 5; currentUser is: ",
    currentUser
  );

  return <p>this is the dashboard</p>;
}
