import { Modal } from 'antd';
import Success from './Suggested Icon.svg';
import './ModalSuccess.css';

export const success = () => {
    Modal.success({
        icon: (
            <img
                src={Success}
                alt='error 500'
                className='error__500'
                style={{ width: '80px', height: '80px', marginBottom: '24px' }}
            />
        ),
        content: 'Отзыв успешно опубликован',
        centered: true,
        width: '539px',
        okButtonProps: { width: '120px' },
        bodyStyle: {
            height: '327px',
            padding: '69px 85.5 px 0 85.5px',
        },
        okText: 'Отлично',
        className: 'modal__success',
    });
};

export const ModalSuccess = () => {
    return <></>;
};
