import { Button } from 'antd';
import './error-check.css';
import { useNavigate } from 'react-router-dom';

export const ErrorCheck: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='wind__back'>
                <div className='check__error'>
                    <div className='error__ex'></div>
                    <div className='check__title'>Такой e-mail не зарегистрирован</div>
                    <div className='error__text_2'>
                        Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.
                    </div>
                    <Button
                        type='primary'
                        onClick={() => {
                            navigate(-1);
                        }}
                        className='check__btn'
                        data-test-id='check-retry-button'
                    >
                        Попробовать снова
                    </Button>
                </div>
            </div>
        </>
    );
};
