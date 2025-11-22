import React, { createContext, useState } from "react";

export const AdminNavContext = createContext();

export const AdminNavProvider = ({ children }) => {
  const [schoolId, setSchoolId] = useState(null);

  return (
    <AdminNavContext.Provider value={{ schoolId, setSchoolId }}>
      {children}
    </AdminNavContext.Provider>
  );
};
