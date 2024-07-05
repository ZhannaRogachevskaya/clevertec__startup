import { Modal } from 'antd';
import Error from './image.svg';
import './ModalError.css';

export const error = () => {
    Modal.error({
        title: 'Что-то пошло не так',
        content: 'Произошла ошибка, попробуйте еще раз.',
        icon: (
            <img
                src={Error}
                alt='error 500'
                className='error__500'
                style={{ width: '253px', height: '293px', marginBottom: '24px' }}
            />
        ),
        centered: true,
        width: '539px',
        bodyStyle: {
            height: '550px',
            padding: '44px 8px 0 8px',
        },
        cancelText: 'Cancel',
        okText: 'Назад',
        className: 'modal__error',
    });
};
export const ModalError: React.FC = () => {
    return <></>;
};
