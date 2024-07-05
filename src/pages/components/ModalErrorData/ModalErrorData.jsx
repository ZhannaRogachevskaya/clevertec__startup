import { Button, Modal, Space } from 'antd';
import Error from './Vector.svg';
import './ModalErrorData.css';
import { useState } from 'react';
// export const errorData = () => {
//     Modal.error({
//         title: 'Данные не сохранились',
//         content: 'Что-то пошло не так. Попробуйте еще раз.',
//         icon: (
//             <img
//                 src={Error}
//                 alt='error 500'
//                 className='error__500'
//                 style={{ width: '80px', height: '80px', marginBottom: '24px' }}
//             />
//         ),
//         centered: true,
//         width: '539px',
//         bodyStyle: {
//             height: '345px',
//             padding: '64px 85.5px 0 85.5px',
//         },
//         cancelText: 'Закрыть',
//         okText: 'Написать отзыв',
//         className: 'modal__error',
//     });
// };

export const ModalErrorData = () => {
    return <div className='maskStyle'></div>;
};
