import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

export const RequiredAuth = ({ children }) => {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return <Navigate to='/auth' />;
    }
    return children;
};
