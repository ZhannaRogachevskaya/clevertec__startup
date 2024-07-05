import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';

export const CheckUrlConfirm2 = ({ children }) => {
    const { isAuth } = useAuth();
    const { fromPage } = useAuth();

    if (fromPage !== '/auth/confirm-email' && fromPage !== '/result/error-change-password') {
        if (!isAuth) {
            return <Navigate to='/auth' />;
        } else if (isAuth) {
            return <Navigate to='/main' />;
        }
    }
    return children;
};
