import './main-page.css';
import React from 'react';
import { MyHeader } from '@pages/components/MyHeader/MyHeader';
import { MyContent } from '@pages/components/MyContent/MyContent';

export const MainPage: React.FC = () => {
    return (
        <>
            <MyHeader />
            <MyContent />
        </>
    );
};
