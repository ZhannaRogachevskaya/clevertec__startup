// import { createContext, useState } from 'react';
// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [isAuth, setIsAuth] = useState(null);
//     const signin = (isAuth, cb) => {
//         setIsAuth(isAuth);
//         cb();
//     };
//     const signout = (cb) => {
//         setIsAuth(null);
//         cb();
//     };
//     const value = { isAuth };
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';
interface AuthContextType {
    isAuth: boolean | null;
    signin: (isAuth: boolean, cb: () => void) => void;
    signout: (isAuth: boolean, cb: () => void) => void;
    fromPage: string;
    check: (fromPage: string, cb: () => void) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(false);
    const navigate = useNavigate();
    const signin = (isAuth: boolean, cb: () => void) => {
        setIsAuth(isAuth);
        cb();
    };

    const signout = (isAuth: boolean, cb: () => void) => {
        setIsAuth(isAuth);
        cb();
    };
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            signin(true, () => navigate('/main', { replace: true }));
        }
    }, []);
    const [fromPage, setFromPage] = useState<string>('');
    const check = (fromPage: string, cb: () => void) => {
        setFromPage(fromPage);
        cb();
    };
    const value: AuthContextType = { isAuth, signin, signout, fromPage, check };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
