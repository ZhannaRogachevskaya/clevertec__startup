import { Button } from 'antd';
import './error-login.css';
import { useNavigate, useLocation } from 'react-router-dom';
export const ErrorLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <div className='wind__back'>
                <div className='window__error'>
                    <div className='icon__error'></div>
                    <div className='error__title'>Вход не выполнен</div>
                    <div className='error__text'>Что-то пошло не так. Попробуйте еще раз</div>
                    <Button
                        type='primary'
                        onClick={() => navigate('/auth')}
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>
                </div>
            </div>
        </>
    );
};
