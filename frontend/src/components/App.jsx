import './App.css';
import React, { useContext } from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import { AppContext } from './Context';

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
import Assessment from './student/student-assessment/Assessment';

function App() {
  const { pathname } = useLocation();
  const allContext = useContext(AppContext);
  const { isStudent, isEducator } = allContext;

  const educatorRestrictedRoutes = new Set(
    ['/educator/home', '/educator/new/classroom', '/educator/new/student', '/educator/studentdetails'],
  );

  const studentRestrictedRoutes = new Set([
    '/student/home', '/student/assessment',
  ]);

  if ((educatorRestrictedRoutes.has(pathname)) && !isEducator) {
    return <Homepage />;
  }

  if ((studentRestrictedRoutes.has(pathname)) && !isStudent) {
    return <Homepage />;
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
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
          <Route
            exact
            path="/student/assessment"
            element={<Assessment />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
