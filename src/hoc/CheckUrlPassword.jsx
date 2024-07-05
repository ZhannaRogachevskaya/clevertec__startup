import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

export const CheckUrlPassword = ({ children }) => {
    const { isAuth } = useAuth();
    const { fromPage } = useAuth();

    if (fromPage !== '/auth/change-password') {
        if (!isAuth) {
            return <Navigate to='/auth' />;
        } else if (isAuth) {
            return <Navigate to='/main' />;
        }
    }
    return children;
};
