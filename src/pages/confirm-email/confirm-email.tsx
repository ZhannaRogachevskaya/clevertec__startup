import './confirm-email.css';
import VerificationInput from 'react-verification-input';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader/Loader';
export const ConfirmEmail: React.FC = () => {
    const location = useLocation();
    const state = location.state;

    const navigate = useNavigate();
    const [elem, setElem] = useState('');

    const { check } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const confirmEmail = (value: any) => {
        setLoading(true);
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/confirm-email',
                {
                    email: state,
                    code: value,
                },
                {
                    withCredentials: true,
                    headers: {
                        accept: 'application/json',

                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                const fromPage = location.pathname;
                if (response.status == 200) {
                    check(fromPage, () => navigate('/auth/change-password', { state: value }));
                }
                setLoading(false);
            })
            .catch((error) => {
                if (error) {
                    setElem('');
                    setError(true);
                }
                setLoading(false);
            });
    };

    return (
        <>
            {loading && <Loader />}
            <div className='wind__back'>
                <div className='window__confirm'>
                    <div className='img__confirm'></div>
                    <div className='confirm__title'>
                        Введите код <br />
                        для восстановления аккаунта
                    </div>
                    <div className='confirm__text'>
                        Мы отправили вам на e-mail {state} шестизначный код. Введите его в поле
                        ниже.
                    </div>
                    <div className='group__input' data-test-id= 'verification-input'>
                        <VerificationInput
                            placeholder=''
                            onComplete={confirmEmail}
                            validChars={'0-9'}
                            classNames={{
                                character: classNames({
                                    error: error,
                                }),
                                characterSelected: classNames({
                                    select_error: error,
                                }),
                            }}
                            value={elem}
                            onChange={setElem}
                            // inputProps={{ 'data-test-id': 'verification-input' }}
                        />
                    </div>
                    <div className='confirm__text'>Не пришло письмо? Проверьте папку Спам.</div>
                </div>
            </div>
        </>
    );
};
