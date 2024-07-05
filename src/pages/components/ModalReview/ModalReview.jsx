import React, { useState } from 'react';
import { Button, Modal, Input, Rate, Divider } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { success } from '../ModalSuccess/ModalSuccess';
import { ModalErrorData } from '../ModalErrorData/ModalErrorData';
export const ModalReview = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState();
    const authToken = localStorage.getItem('accessToken');

    const createReview = () => {
        console.log(message, rating);
        handleOk();
        axios
            .post(
                'https://marathon-api.clevertec.ru/feedbac',
                {
                    message,
                    rating,
                },
                {
                    withCredentials: true,
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                console.log(response);

                success();
            })
            .catch((error) => {
                // const err = error.response.status;
                console.log(error);
                <ModalErrorData />;

                // const fromPage = location.pathname;
                // if (err) {
                //     check(fromPage, () => navigate('/result/error-login'));
                // }
            });
    };
    return (
        <div className='modal__review'>
            <Button type='primary' onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title='Ваш отзыв'
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                okButtonProps={{ disabled: true }}
                footer={[
                    <Button
                        type='primary'
                        onClick={createReview}
                        style={{
                            width: '145px',
                            padding: '4px, 15px, 4px, 15px',
                            borderRadius: '2px',
                            color: '#ffffff',
                        }}
                        disabled={!message}
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <Divider />
                <Rate
                    style={{ marginBottom: '16px', width: '136px', height: '24px' }}
                    character={<StarOutlined />}
                    count={5}
                    onChange={(count) => setRating(count)}
                />
                <Input.TextArea
                    placeholder='Напишите Ваш отзыв'
                    autoSize={{ minRows: 2 }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Divider />
            </Modal>
        </div>
    );
};
