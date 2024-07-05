import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { LoginPage } from '@pages/login-page/login-page';
import { RegistrPage } from '@pages/registr-page/RegistrPage';
import { ErrorLogin } from '@pages/error-login/error-login';
import { ErrorUser } from '@pages/error-user/error-user';
import { ResultError } from '@pages/result-error/result-error';
import { ResultSuccess } from '@pages/result-success/result-success';
import { CheckEmail } from '@pages/check-emai/check-emai';
import { ConfirmEmail } from '@pages/confirm-email/confirm-email';
import { ChangePassword } from '@pages/change-password/change-password';
import { SuccessPassword } from '@pages/success-password/success-password';
import { ErrorPassword } from '@pages/error-password/error-password';
import { ErrorCheck } from '@pages/error-check/error-check';
import { RequiredAuth } from '../hoc/RequiredAuth';
import { AuthProvider } from '../hoc/AuthProvider';
import { CheckUrl } from '../hoc/CheckUrl';
import { CheckUrlReg } from '../hoc/CheckUrlReg';
import { CheckUrlConfirm } from '../hoc/CheckUrlConfirm';
// import { CheckUrlConfirm2 } from '../hoc/CheckUrlConfirm2';
import { CheckUrlPassword } from '../hoc/CheckUrlPassword';
import { LayoutPage } from '../pages/layout/LayoutPage';
import { FeedbacksPage } from '../pages/feedbacks-page/feedbacks-page';

export const routes = (
    <AuthProvider>
        <Routes>
            {/* <Route path='/' element={<Navigate to={'/auth'} />} /> */}
            <Route path='/auth' element={<LoginPage />} />

            <Route path='/auth/registration' element={<RegistrPage />} />

            <Route
                path='/'
                element={
                    <RequiredAuth>
                        <LayoutPage />
                    </RequiredAuth>
                }
            >
                <Route path='/main' element={<MainPage />} />
                <Route path='/feedbacks' element={<FeedbacksPage />} />
            </Route>
            <Route
                path='/result/error-login'
                element={
                    <CheckUrl>
                        <ErrorLogin />
                    </CheckUrl>
                }
            />
            <Route
                path='/result/success'
                element={
                    <CheckUrlReg>
                        <ResultSuccess />
                    </CheckUrlReg>
                }
            />
            <Route
                path='/result/error-user-exist'
                element={
                    <CheckUrlReg>
                        <ErrorUser />
                    </CheckUrlReg>
                }
            ></Route>
            <Route
                path='/result/error'
                element={
                    <CheckUrlReg>
                        <ResultError />
                    </CheckUrlReg>
                }
            />
            <Route
                path='/auth/confirm-email'
                element={
                    <CheckUrl>
                        <ConfirmEmail />
                    </CheckUrl>
                }
            />
            <Route
                path='/result/error-check-email'
                element={
                    <CheckUrl>
                        <CheckEmail />
                    </CheckUrl>
                }
            />

            <Route
                path='/result/error-check-email-no-exist'
                element={
                    <CheckUrl>
                        <ErrorCheck />
                    </CheckUrl>
                }
            />

            <Route
                path='/auth/change-password'
                element={
                    <CheckUrlConfirm>
                        <ChangePassword />
                    </CheckUrlConfirm>
                }
            />

            <Route
                path='/result/success-change-password'
                element={
                    <CheckUrlPassword>
                        <SuccessPassword />
                    </CheckUrlPassword>
                }
            />
            <Route
                path='/result/error-change-password'
                element={
                    <CheckUrlPassword>
                        <ErrorPassword />
                    </CheckUrlPassword>
                }
            />

            <Route path='*' element={<Navigate to={'/auth'} />} />
        </Routes>
    </AuthProvider>
);
