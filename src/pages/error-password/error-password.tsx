import { Button } from 'antd';
import './error-password.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const ErrorPassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <div className='wind__back'>
                <div className='window__error-password'>
                    <div className='icon__error-pass'></div>
                    <div className='error__title'>Данные не сохранились</div>
                    <div className='error__text'>Что-то пошло не так. Попробуйте еще раз</div>
                    <Button
                        type='primary'
                        onClick={() =>
                            navigate('/auth/change-password', {
                                state: { from: location.pathname },
                            })
                        }
                        data-test-id='change-retry-button'
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </>
    );
};
