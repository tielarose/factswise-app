import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContextProvider from './Context';

// Navbar & Home Components
import Navbar from './navbar/Navbar';
import Homepage from './Homepage';

// Educator Components
import EducatorLogin from './educator/educator-login/EducatorLogin';
import EducatorSignup from './educator/educator-signup/EducatorSignup';
import EducatorDashboard from './educator/educator-dashboard/EducatorDashboard';
import NewStudent from './educator/educator-dashboard/NewStudent';
import NewClassroom from './educator/educator-dashboard/NewClassroom';

// Student Details
import StudentDetails from './educator/educator-dashboard/student-details/StudentDetails';

// Student Components
import StudentLogin from './student/student-login/StudentLogin';
import StudentDashboard from './student/student-dashboard/StudentDashboard';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Navbar />
        <Routes>
          {/* for each route, do what is on the line below */}
          <Route exact path="/" element={<Homepage />} />
          <Route
            exact
            path="/educator/login"
            element={(
              <EducatorLogin />
            )}
          />
          <Route
            exact
            path="/educator/signup"
            element={(
              <EducatorSignup />
            )}
          />
          <Route
            exact
            path="/educator/home"
            element={<EducatorDashboard />}
          />
          <Route exact path="/educator/new/student" element={<NewStudent />} />
          <Route
            exact
            path="/educator/new/classroom"
            element={<NewClassroom />}
          />
          <Route
            exact
            path="/educator/studentdetails"
            element={<StudentDetails />}
          />
          <Route exact path="/student/login" element={<StudentLogin />} />
          <Route
            exact
            path="/student/home"
            element={<StudentDashboard />}
          />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
