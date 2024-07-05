import React, { useState, useEffect } from 'react';
import './MySider.css';
import { Layout, Grid } from 'antd';
import { MyMenu } from '@pages/components/MyMenu/MyMenu';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { Button } from 'antd';
// import ExitSvg from './inner-wrapper.svg';
const { Sider } = Layout;
const { useBreakpoint } = Grid;

export const MySider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [logoClass, setLogoClass] = useState('logo');
    const handleTriggerClick = () => {
        setLogoClass((prevClass) => (prevClass === 'logo' ? 'logo_icon' : 'logo'));
    };
    const screens = useBreakpoint();

    const [isTablet, setisTablet] = useState(window.innerWidth <= 1440);
    useEffect(() => {
        const handleResize = () => {
            setisTablet(window.innerWidth <= 360);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={screens.xl ? 208 : screens.xs ? 106 : 200}
                breakpoint='lg'
                collapsedWidth={screens.xl ? 64 : screens.xs ? 0 : 64}
                theme={'light'}
            >
                <div className={logoClass}></div>
                <MyMenu />
                <div
                    className='trigger__back'
                    data-test-id={isTablet ? 'sider-switch-mobile' : 'sider-switch'}
                    onClick={handleTriggerClick}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger ',
                        onClick: () => {
                            setCollapsed(!collapsed);
                        },
                    })}
                </div>
                {/* <Button type={'text'}>
                    <div className='btn__exit'>
                        <img src={ExitSvg} alt='Exit SVG' />
                        <span className='exit'>Выход</span>
                    </div>
                </Button> */}
            </Sider>
        </>
    );
};
