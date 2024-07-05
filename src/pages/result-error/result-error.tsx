import { Button } from 'antd';
import './result-error.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
export const ResultError: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { check } = useAuth();
    const data2 = location.state;
    const email1 = data2.data.email;
    const password1 = data2.data.password;

    const repeatedRequest = () => {
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/registration',
                {
                    email1,
                    password1,
                },
                {
                    withCredentials: true,
                    headers: {
                        accept: 'application/json',
                        // Authorization: 'Bearer qweqweqwe',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                const fromPage = location.pathname;
                if (response.status == 201) {
                    check(fromPage, () => navigate('/result/success'));
                }
            })
            .catch((error) => {
                console.log(error);
                const data1 = { email1, password1 };
                console.log(data1);
                const err = error.response.status;
                const fromPage = location.pathname;
                if (err == 409) {
                    check(fromPage, () => navigate('/result/error-user-exist'));
                } else if (err !== 409) {
                    check(fromPage, () => navigate('/result/error', { state: { data1 } }));
                }
            });
    };
    return (
        <>
            <div className='wind__back'>
                <div className='window__error'>
                    <div className='error__ex'></div>
                    <div className='error__title'>Данные не сохранились</div>
                    <div className='error__text_2'>
                        Что-то пошло не так и ваша регистрация не завершилась. Попробуйте еще раз.
                    </div>
                    <Button
                        type='primary'
                        onClick={() => {
                            repeatedRequest();
                        }}
                        data-test-id='registration-retry-button'
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </>
    );
};
