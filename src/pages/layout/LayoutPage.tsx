import './LayoutPage.css';
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { MyHeader } from '@pages/components/MyHeader/MyHeader';
import { MySider } from '../components/MySider/MySider';
import { MyContent } from '@pages/components/MyContent/MyContent';
import { Outlet } from 'react-router-dom';

export const LayoutPage: React.FC = () => {
    return (
        <>
            <Layout>
                <MySider />
                <Layout>
                    <Outlet />
                    {/* <MyHeader />
                    <MyContent /> */}
                </Layout>
            </Layout>
        </>
    );
};
