/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext({});

function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEducator, setIsEducator] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId != null) {
      fetch('/api/checkuser', {
        method: 'POST',
        body: JSON.stringify({
          userId,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsStudent(data.is_student);
          setIsEducator(data.is_educator);
          setCurrentUser(data.user_info);
        });
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      isEducator,
      setIsEducator,
      isStudent,
      setIsStudent,

    }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
