import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const localAuthUser = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser"))
    : null;

  const [authUser, setAuthUser] = useState(localAuthUser);

  const setUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    setAuthUser(user);
  };

  const clearUser = () => {
    localStorage.removeItem("authUser");
    setAuthUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        setUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
