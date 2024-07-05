import './feedbacks-page.css';
import React, { useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { error } from '../components/ModalError/ModalError';
import { useLocation } from 'react-router-dom';
import { CommentItem } from '../components/CommentItem/CommentItem';
import { Button } from 'antd';
import { ModalReview } from '../components/ModalReview/ModalReview';

export const FeedbacksPage = () => {
    const location = useLocation();
    const data = location.state.data;

    const [items, setItems] = useState(data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <Content className='content'>
                <div className='wrapper__feedbacks'>
                    <div className='feedback__content'>
                        {items.map((item) => (
                            <CommentItem item={item} key={item.id} />
                        ))}
                    </div>
                    <div className='feedback__btns'>
                        <Button type='primary' onClick={showModal}>
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            style={{
                                width: '186px',
                                height: '40px',
                                color: 'rgba(47, 84, 235, 1)',
                            }}
                        >
                            Развернуть все отзывы
                        </Button>
                    </div>
                </div>
            </Content>
            <ModalReview isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
};
