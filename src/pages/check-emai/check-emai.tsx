import { Button } from 'antd';
import './check-emai.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
export const CheckEmail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { check } = useAuth();
    const data2 = location.state;
    const email1 = data2.data.email;

    const repeatedRequest = () => {
        axios
            .post(
                'https://marathon-api.clevertec.ru/auth/check-email',
                {
                    email1,
                },
                {
                    headers: {
                        accept: 'application/json',
                        // Authorization: 'Bearer qweqweqwe',
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                // const fromPage = location.state?.from?.pathname || '/auth';
                console.log(response);
                if (response.status == 200) {
                    const fromPage = location.pathname;
                    check(fromPage, () => navigate('/auth/confirm-email', { state: email1 }));
                }
            })
            .catch((error) => {
                console.log(error);
                const data1 = { email1 };
                const err = error.response.status;
                const fromPage = location.pathname;
                if (err == 404 && error.config.message.length == 0) {
                    check(fromPage, () =>
                        navigate('/result/error-check-email-no-exist', { replace: true }),
                    );
                } else if (err == 404 && error.config.message.length !== 0) {
                    check(fromPage, () =>
                        navigate('/result/error-check-email', { state: { data1 } }),
                    );
                } else if (err == 409) {
                    check(fromPage, () =>
                        navigate('/result/error-check-email', { state: { data1 } }),
                    );
                }
            });
    };
    return (
        <>
            <div className='wind__back'>
                <div className='window__check'>
                    <div className='img__check'></div>
                    <div className='error__title'>Что-то пошло не так</div>
                    <div className='error__text_2'>
                        Произошла ошибка, попробуйте отправить форму ещё раз.
                    </div>
                    <Button
                        className='btn__small'
                        type='primary'
                        onClick={() => repeatedRequest()}
                        data-test-id='check-back-button'
                    >
                        Назад
                    </Button>
                </div>
            </div>
        </>
    );
};
