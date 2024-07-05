import './MyHeader.css';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { Grid } from 'antd';
const { useBreakpoint } = Grid;
export const MyHeader: React.FC = () => {
    const screens = useBreakpoint();
    return (
        <header className='header'>
            <a className='breadcrumb '>Главная</a>
            <div className='header__title'>
                <h1>
                    <span>Приветствуем тебя в CleverFit — приложении,</span>
                    <span>которое поможет тебе добиться своей мечты!</span>
                </h1>

                <Button
                    type={screens.xl ? 'text' : screens.xs ? 'primary' : 'text'}
                    shape={screens.xl ? 'default' : screens.xs ? 'circle' : 'default'}
                >
                    <SettingOutlined className='setting_out_lined' />
                    <span className='settings'>Настройки</span>
                </Button>
            </div>
        </header>
    );
};
