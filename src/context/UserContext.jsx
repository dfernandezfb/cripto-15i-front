import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../config/axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (values) => {
    try {
      const { data } = await axios.post("/users/login", values);
      setAuthenticated(!!data.user);
      setUser(data.user);
      localStorage.setItem("token", data.token);
    } catch (error) {
      toast.error("Ups! Hubo un error, intenta más tarde por favor");
    }
  };

  const getAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return setAuthenticated(false);
      }
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/users/authStatus");
      setUser(data.user);
      setAuthenticated(true);
    } catch (error) {
      toast.error("Error de autenticación. Ingrese nuevamente");
    }
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        authenticated,
        loading,
        login,
        getAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
