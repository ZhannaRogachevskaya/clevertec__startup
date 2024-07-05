import './CommentItem.css';
import { useState } from 'react';
export const CommentItem = (item) => {
    return (
        <>
            <div className='comment-item'>
                <div className='user__item'>
                    <div className='user__photo'>
                        <img src='{item.item.imageSrc}' alt='' />
                    </div>
                    <div className='user__name'>{item.item.fullName}</div>
                </div>
                <div className='item__content'>
                    <div className='star'></div>
                    <div className='feedback__text'>{item.item.message}</div>
                </div>
            </div>
        </>
    );
};
