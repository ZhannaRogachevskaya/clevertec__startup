// import { useContext } from 'react';
// import { AuthContext } from '../hoc/AuthProvider';
// export function useAuth() {
//     return useContext(AuthContext);
// }
import { useContext } from 'react';
import { AuthContext } from '../hoc/AuthProvider';

interface AuthContextType {
    isAuth: boolean | null;
    signin: (isAuth: boolean, cb: () => void) => void;
    signout: (isAuth: boolean, cb: () => void) => void;
    fromPage: string;
    check: (fromPage: string, cb: () => void) => void;
}

export function useAuth() {
    return useContext(AuthContext) as AuthContextType;
}
