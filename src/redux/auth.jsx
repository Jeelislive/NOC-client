import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const storetokeninLS = (token) => {
        return localStorage.setItem("token", token);
    }


    return (
        <AuthContext.Provider value={{storetokeninLS}}>
            {children}
            </AuthContext.Provider>
    );
    }

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if (!AuthContextValue) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return AuthContextValue;
}