import { Button } from 'antd';
import './error-user.css';
import { useNavigate } from 'react-router-dom';
export const ErrorUser: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='wind__back'>
                <div className='window__error'>
                    <div className='error__ex'></div>
                    <div className='error__title'>Данные не сохранились</div>
                    <div className='error__text_2'>
                        Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                        e-mail.
                    </div>
                    <Button
                        type='primary'
                        onClick={() => navigate('/auth/registration')}
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>
                </div>
            </div>
        </>
    );
};
